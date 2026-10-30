import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';

@Component({
  selector: 'button[aevkoToggleGroupItem]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './toggle-group-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    '[attr.aria-pressed]': 'selected()',
    '[attr.data-state]': 'selected() ? "on" : "off"',
    '[attr.data-value]': 'value()',
  },
})
export class AevkoToggleGroupItem {
  readonly value = input.required<string>();
  readonly selected = computed(() => this.groupValues().includes(this.value()));
  groupValues = signal<readonly string[]>([]);
  readonly element = inject<ElementRef<HTMLButtonElement>>(ElementRef);
}

@Component({
  selector: 'aevko-toggle-group',
  standalone: true,
  template:
    '<div role="group" [attr.aria-label]="label()" (click)="activate($event)" (keydown)="navigate($event)"><ng-content /></div>',
  styleUrl: './toggle-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-orientation]': 'orientation()' },
})
export class AevkoToggleGroup {
  readonly label = input.required<string>();
  readonly type = input<'single' | 'multiple'>('single');
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly value = model<readonly string[]>([]);
  private readonly items = contentChildren(AevkoToggleGroupItem);

  constructor() {
    effect(() => {
      const values = this.value();
      for (const item of this.items()) item.groupValues.set(values);
    });
  }

  protected activate(event: MouseEvent): void {
    const item = this.items().find(({ element }) =>
      element.nativeElement.contains(event.target as Node),
    );
    if (!item || item.element.nativeElement.disabled) return;
    const itemValue = item.value();
    const selected = this.value().includes(itemValue);
    this.value.set(
      this.type() === 'single'
        ? selected
          ? []
          : [itemValue]
        : selected
          ? this.value().filter((value) => value !== itemValue)
          : [...this.value(), itemValue],
    );
  }

  protected navigate(event: KeyboardEvent): void {
    const keys =
      this.orientation() === 'vertical' ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];
    if (![...keys, 'Home', 'End'].includes(event.key)) return;
    const enabled = this.items().filter(({ element }) => !element.nativeElement.disabled);
    const current = enabled.findIndex(({ element }) => element.nativeElement === event.target);
    if (current < 0 || enabled.length === 0) return;
    event.preventDefault();
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? enabled.length - 1
          : (current + (event.key === keys[0] ? -1 : 1) + enabled.length) % enabled.length;
    enabled[next]?.element.nativeElement.focus();
  }
}
