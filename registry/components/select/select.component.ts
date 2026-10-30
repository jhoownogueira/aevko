import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
export interface AevkoSelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}
@Component({
  selector: 'aevko-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoSelect {
  readonly label = input.required<string>();
  readonly placeholder = input('Select an option');
  readonly items = input.required<readonly AevkoSelectItem[]>();
  readonly value = model('');
  readonly disabled = input(false);
  protected readonly open = signal(false);
  protected readonly active = signal(0);
  protected readonly selected = computed(() =>
    this.items().find((item) => item.value === this.value()),
  );
  protected toggle(): void {
    if (!this.disabled()) this.open.update((v) => !v);
  }
  protected keydown(event: KeyboardEvent): void {
    const items = this.items().filter((item) => !item.disabled);
    if (event.key === 'Escape') {
      this.open.set(false);
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    if (!this.open()) {
      this.open.set(true);
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      const item = items[this.active()];
      if (item) this.choose(item);
    } else
      this.active.update(
        (i) => (i + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length,
      );
  }
  protected choose(item: AevkoSelectItem): void {
    if (!item.disabled) {
      this.value.set(item.value);
      this.open.set(false);
    }
  }
}
