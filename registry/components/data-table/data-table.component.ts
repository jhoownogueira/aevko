import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';

export interface AevkoDataTableColumn<T> {
  readonly key: string;
  readonly header: string;
  readonly value: (row: T) => unknown;
  readonly sortable?: boolean;
  readonly align?: 'start' | 'center' | 'end';
}

export interface AevkoDataTableSort {
  readonly key: string;
  readonly direction: 'asc' | 'desc';
}

@Component({
  selector: 'aevko-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoDataTable<T extends object> {
  readonly caption = input.required<string>();
  readonly rows = input.required<readonly T[]>();
  readonly columns = input.required<readonly AevkoDataTableColumn<T>[]>();
  readonly rowKey = input.required<(row: T) => string>();
  readonly selectable = input(false);
  readonly loading = input(false);
  readonly emptyMessage = input('No results found');
  readonly manual = input(false);
  readonly totalRows = input<number | null>(null);
  readonly pageSize = input(10);
  readonly filter = model('');
  readonly sort = model<AevkoDataTableSort | null>(null);
  readonly page = model(1);
  readonly selectedKeys = model<readonly string[]>([]);

  protected readonly processedRows = computed(() => {
    if (this.manual()) return this.rows();
    const query = this.filter().trim().toLocaleLowerCase();
    let rows = query
      ? this.rows().filter((row) =>
          this.columns().some((column) =>
            String(column.value(row) ?? '')
              .toLocaleLowerCase()
              .includes(query),
          ),
        )
      : [...this.rows()];
    const sort = this.sort();
    if (sort) {
      const column = this.columns().find(({ key }) => key === sort.key);
      if (column) {
        rows = [...rows].sort(
          (left, right) =>
            String(column.value(left) ?? '').localeCompare(
              String(column.value(right) ?? ''),
              undefined,
              {
                numeric: true,
              },
            ) * (sort.direction === 'asc' ? 1 : -1),
        );
      }
    }
    const start = (this.page() - 1) * this.pageSize();
    return rows.slice(start, start + this.pageSize());
  });
  protected readonly resultCount = computed(() => {
    if (this.manual()) return this.totalRows() ?? this.rows().length;
    const query = this.filter().trim().toLocaleLowerCase();
    return query
      ? this.rows().filter((row) =>
          this.columns().some((column) =>
            String(column.value(row) ?? '')
              .toLocaleLowerCase()
              .includes(query),
          ),
        ).length
      : this.rows().length;
  });
  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.resultCount() / this.pageSize())),
  );

  protected toggleSort(column: AevkoDataTableColumn<T>): void {
    if (!column.sortable) return;
    const current = this.sort();
    const next =
      current?.key !== column.key
        ? { key: column.key, direction: 'asc' as const }
        : current.direction === 'asc'
          ? { key: column.key, direction: 'desc' as const }
          : null;
    this.sort.set(next);
  }

  protected toggleRow(key: string): void {
    this.selectedKeys.update((keys) =>
      keys.includes(key) ? keys.filter((candidate) => candidate !== key) : [...keys, key],
    );
  }

  protected setPage(page: number): void {
    const next = Math.min(Math.max(1, page), this.totalPages());
    this.page.set(next);
  }
}
