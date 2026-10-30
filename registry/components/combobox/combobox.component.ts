import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
export interface AevkoComboboxItem {
  value: string;
  label: string;
  disabled?: boolean;
  keywords?: readonly string[];
}
@Component({
  selector: 'aevko-combobox',
  standalone: true,
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoCombobox {
  readonly label = input.required<string>();
  readonly placeholder = input('Search options…');
  readonly emptyMessage = input('No items found.');
  readonly items = input.required<readonly AevkoComboboxItem[]>();
  readonly value = model('');
  readonly query = model('');
  protected readonly open = signal(false);
  protected readonly active = signal(0);
  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLocaleLowerCase();
    return this.items().filter(
      (item) =>
        !q || [item.label, ...(item.keywords ?? [])].join(' ').toLocaleLowerCase().includes(q),
    );
  });
  protected inputValue(value: string): void {
    this.query.set(value);
    this.open.set(true);
    this.active.set(0);
  }
  protected keydown(event: KeyboardEvent): void {
    const items = this.filtered().filter((item) => !item.disabled);
    if (event.key === 'Escape') {
      this.open.set(false);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.open.set(true);
      this.active.update(
        (i) => (i + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length,
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = items[this.active()];
      if (item) this.choose(item);
    }
  }
  protected choose(item: AevkoComboboxItem): void {
    if (!item.disabled) {
      this.value.set(item.value);
      this.query.set(item.label);
      this.open.set(false);
    }
  }
}
