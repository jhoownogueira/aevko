import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  booleanAttribute,
  contentChildren,
  inject,
  input,
  model,
} from '@angular/core';
@Directive({ selector: '[aevkoContextMenuTrigger]', standalone: true })
export class AevkoContextMenuTrigger {}
@Directive({
  selector: 'button[aevkoContextMenuItem]',
  standalone: true,
  host: { type: 'button', role: 'menuitem', tabindex: '-1' },
})
export class AevkoContextMenuItem {
  readonly element = inject<ElementRef<HTMLButtonElement>>(ElementRef);
  readonly disabled = input(false, { transform: booleanAttribute });
}
@Component({
  selector: 'aevko-context-menu',
  standalone: true,
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(contextmenu)': 'openAt($event)',
    '(click)': 'click($event)',
    '(keydown)': 'keydown($event)',
  },
})
export class AevkoContextMenu {
  readonly label = input.required<string>();
  readonly open = model(false);
  protected x = 0;
  protected y = 0;
  private readonly items = contentChildren(AevkoContextMenuItem, { descendants: true });
  protected openAt(event: MouseEvent): void {
    if (!(event.target as Element).closest('[aevkoContextMenuTrigger]')) return;
    event.preventDefault();
    this.x = event.clientX;
    this.y = event.clientY;
    this.open.set(true);
    queueMicrotask(() => this.enabled()[0]?.element.nativeElement.focus());
  }
  protected click(event: MouseEvent): void {
    if ((event.target as Element).closest('[aevkoContextMenuItem]')) this.open.set(false);
  }
  protected keydown(event: KeyboardEvent): void {
    if (!this.open()) return;
    const items = this.enabled();
    const current = items.findIndex((item) => item.element.nativeElement === event.target);
    if (event.key === 'Escape') {
      event.preventDefault();
      this.open.set(false);
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const index =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? items.length - 1
            : (current + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length;
      items[index]?.element.nativeElement.focus();
    }
  }
  private enabled(): AevkoContextMenuItem[] {
    return this.items().filter((item) => !item.disabled() && !item.element.nativeElement.disabled);
  }
}
