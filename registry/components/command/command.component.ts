import {
  ChangeDetectionStrategy,
  Component,
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
})
export class AevkoCommand {
  readonly label = input('Command menu');
  readonly placeholder = input('Type a command or search…');
  readonly items = input.required<readonly AevkoCommandItem[]>();
  readonly query = model('');
  readonly value = model('');
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
  protected move(event: KeyboardEvent): void {
    const items = this.filtered().filter((item) => !item.disabled);
    if (!items.length) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.active.update(
        (index) => (index + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length,
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = items[this.active()];
      if (item) this.select(item);
    }
  }
  protected select(item: AevkoCommandItem): void {
    if (item.disabled) return;
    this.value.set(item.id);
    this.activated.emit(item);
  }
}
