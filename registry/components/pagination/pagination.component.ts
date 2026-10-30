import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'aevko-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'navigation', '[attr.aria-label]': 'label()' },
})
export class AevkoPagination {
  readonly page = model(1);
  readonly totalPages = input.required<number>();
  readonly label = input('Pagination');
  protected readonly pages = computed(() =>
    Array.from({ length: Math.max(0, this.totalPages()) }, (_, index) => index + 1),
  );
  protected select(page: number): void {
    this.page.set(Math.min(Math.max(page, 1), Math.max(this.totalPages(), 1)));
  }
}
