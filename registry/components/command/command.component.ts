import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  model,
  output,
  signal,
} from '@angular/core';
export interface AevkoCommandItem {
  id: string;
  label: string;
  description?: string;
  group?: string;
  shortcut?: string;
  disabled?: boolean;
  keywords?: readonly string[];
}
@Component({
  selector: 'aevko-command',
  standalone: true,
  templateUrl: './command.component.html',
  styleUrl: './command.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'command',
    '[attr.data-disabled]': 'disabled() ? "true" : null',
  },
})
export class AevkoCommand {
  readonly id = input('aevko-command');
  readonly label = input('Command menu');
  readonly placeholder = input('Type a command or search…');
  readonly items = input.required<readonly AevkoCommandItem[]>();
  readonly query = model('');
  readonly value = model('');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly activated = output<AevkoCommandItem>();
  protected readonly active = signal(0);
  protected readonly filtered = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    return this.items().filter(
      (item) =>
        !query ||
        [item.label, item.description, ...(item.keywords ?? [])]
          .filter(Boolean)
          .join(' ')
          .toLocaleLowerCase()
          .includes(query),
    );
  });
  protected readonly enabledItems = computed(() =>
    this.filtered().filter((item) => !item.disabled),
  );
  protected readonly activeOption = computed(() => this.enabledItems()[this.active()]);
  protected move(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }
    const items = this.enabledItems();
    if (!items.length) {
      return;
    }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      this.active.update((index) =>
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? items.length - 1
            : (index + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length,
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = items[this.active()];
      if (item) this.select(item);
    }
  }
  protected select(item: AevkoCommandItem): void {
    if (item.disabled || this.disabled()) {
      return;
    }
    this.value.set(item.id);
    this.activated.emit(item);
  }
}
