import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  booleanAttribute,
  contentChildren,
  inject,
  input,
} from '@angular/core';
@Directive({
  selector: 'button[aevkoMenubarItem]',
  standalone: true,
  host: { type: 'button', role: 'menuitem', tabindex: '-1' },
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'menubar', '[attr.aria-label]': 'label()', '(keydown)': 'navigate($event)' },
})
export class AevkoMenubar {
  readonly label = input.required<string>();
  private readonly items = contentChildren(AevkoMenubarItem, { descendants: true });
  protected navigate(event: KeyboardEvent): void {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const items = this.items().filter(
      (item) => !item.disabled() && !item.element.nativeElement.disabled,
    );
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
}
