import {
  ViewEncapsulation,
  afterEveryRender,
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
@Directive({
  selector: '[aevkoContextMenuTrigger]',
  standalone: true,
  host: { tabindex: '0', 'data-slot': 'context-menu-trigger', 'aria-haspopup': 'menu' },
})
export class AevkoContextMenuTrigger {}
@Directive({
  selector: 'button[aevkoContextMenuItem]',
  standalone: true,
  host: {
    type: 'button',
    role: 'menuitem',
    tabindex: '-1',
    'data-slot': 'context-menu-item',
    '[disabled]': 'disabled()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
  },
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'context-menu-root',
    '(document:pointerdown)': 'dismissOutside($event)',
    '(document:focusin)': 'dismissOutside($event)',
    '(contextmenu)': 'openAt($event)',
    '(click)': 'click($event)',
    '(keydown)': 'keydown($event)',
  },
})
export class AevkoContextMenu {
  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  protected dismissOutside(event: Event): void {
    if (this.open() && !event.composedPath().includes(this.hostElement.nativeElement)) {
      this.open.set(false);
    }
  }
  constructor() {
    afterEveryRender(() => {
      if (!this.open()) return;
      const panel = this.hostElement.nativeElement.querySelector<HTMLElement>('[role="menu"]');
      const view = panel?.ownerDocument.defaultView;
      if (!panel || !view) return;
      const rect = panel.getBoundingClientRect();
      panel.style.left = `${Math.max(8, Math.min(this.x, view.innerWidth - rect.width - 8))}px`;
      panel.style.top = `${Math.max(8, Math.min(this.y, view.innerHeight - rect.height - 8))}px`;
    });
  }
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
    if (
      !this.open() &&
      ((event.shiftKey && event.key === 'F10') || event.key === 'ContextMenu') &&
      (event.target as Element).closest('[aevkoContextMenuTrigger]')
    ) {
      event.preventDefault();
      const target = event.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.x = rect.left;
      this.y = rect.bottom;
      this.open.set(true);
      queueMicrotask(() => this.enabled()[0]?.element.nativeElement.focus());
      return;
    }
    if (!this.open()) return;
    const items = this.enabled();
    const current = items.findIndex((item) => item.element.nativeElement === event.target);
    if (event.key === 'Escape') {
      event.preventDefault();
      this.open.set(false);
      this.hostElement.nativeElement
        .querySelector<HTMLElement>('[aevkoContextMenuTrigger]')
        ?.focus();
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
