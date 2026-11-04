import {
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  booleanAttribute,
  contentChildren,
  effect,
  inject,
  input,
} from '@angular/core';
@Directive({
  selector: 'button[aevkoMenubarItem]',
  standalone: true,
  host: {
    type: 'button',
    role: 'menuitem',
    tabindex: '-1',
    'data-slot': 'menubar-item',
    '[disabled]': 'disabled()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
  },
})
export class AevkoMenubarItem {
  readonly element = inject<ElementRef<HTMLButtonElement>>(ElementRef);
  readonly disabled = input(false, { transform: booleanAttribute });
}
@Component({
  selector: 'aevko-menubar',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './menubar.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'menubar',
    'data-slot': 'menubar',
    '[attr.aria-label]': 'label()',
    '(keydown)': 'navigate($event)',
  },
})
export class AevkoMenubar {
  readonly label = input.required<string>();
  private readonly items = contentChildren(AevkoMenubarItem, { descendants: true });
  constructor() {
    effect(() => {
      const enabled = this.enabledItems();
      for (const item of this.items()) {
        item.element.nativeElement.tabIndex = item === enabled[0] ? 0 : -1;
      }
    });
  }
  protected navigate(event: KeyboardEvent): void {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const items = this.enabledItems();
    const current = items.findIndex((item) => item.element.nativeElement === event.target);
    if (current < 0) return;
    event.preventDefault();
    const index =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? items.length - 1
          : (current + (event.key === 'ArrowLeft' ? -1 : 1) + items.length) % items.length;
    items[index]?.element.nativeElement.focus();
  }
  private enabledItems(): AevkoMenubarItem[] {
    return this.items().filter((item) => !item.disabled() && !item.element.nativeElement.disabled);
  }
}
