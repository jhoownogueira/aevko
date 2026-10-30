import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  booleanAttribute,
  contentChild,
  contentChildren,
  effect,
  inject,
  input,
  model,
} from '@angular/core';

@Directive({ selector: '[aevkoDropdownMenuTrigger]', standalone: true })
export class AevkoDropdownMenuTrigger {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
}
@Directive({
  selector: 'button[aevkoDropdownMenuItem]',
  standalone: true,
  host: { type: 'button', role: 'menuitem', tabindex: '-1' },
})
export class AevkoDropdownMenuItem {
  readonly element = inject<ElementRef<HTMLButtonElement>>(ElementRef);
  readonly disabled = input(false, { transform: booleanAttribute });
}

@Component({
  selector: 'aevko-dropdown-menu',
  standalone: true,
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(click)': 'click($event)', '(keydown)': 'keydown($event)' },
})
export class AevkoDropdownMenu {
  readonly label = input.required<string>();
  readonly id = input('aevko-dropdown-menu');
  readonly open = model(false);
  readonly align = input<'start' | 'end'>('start');
  private readonly trigger = contentChild(AevkoDropdownMenuTrigger);
  private readonly items = contentChildren(AevkoDropdownMenuItem, { descendants: true });
  constructor() {
    effect(() => {
      const trigger = this.trigger()?.element.nativeElement;
      if (!trigger) return;
      trigger.setAttribute('aria-haspopup', 'menu');
      trigger.setAttribute('aria-expanded', String(this.open()));
      trigger.setAttribute('aria-controls', this.id());
    });
  }
  protected click(event: MouseEvent): void {
    const target = event.target as Element;
    if (target.closest('[aevkoDropdownMenuTrigger]')) {
      this.open.update((v) => !v);
      if (this.open()) setTimeout(() => this.focus(0));
    } else if (target.closest('[aevkoDropdownMenuItem]')) this.open.set(false);
  }
  protected keydown(event: KeyboardEvent): void {
    if (
      !this.open() &&
      ['ArrowDown', 'Enter', ' '].includes(event.key) &&
      (event.target as Element).closest('[aevkoDropdownMenuTrigger]')
    ) {
      event.preventDefault();
      this.open.set(true);
      setTimeout(() => this.focus(0));
      return;
    }
    if (!this.open()) return;
    const enabled = this.items().filter(
      (item) => !item.disabled() && !item.element.nativeElement.disabled,
    );
    const current = enabled.findIndex((item) => item.element.nativeElement === event.target);
    if (event.key === 'Escape') {
      event.preventDefault();
      this.open.set(false);
      this.trigger()?.element.nativeElement.focus();
    } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const index =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? enabled.length - 1
            : (current + (event.key === 'ArrowUp' ? -1 : 1) + enabled.length) % enabled.length;
      enabled[index]?.element.nativeElement.focus();
    }
  }
  private focus(index: number): void {
    this.items()
      .filter((item) => !item.disabled() && !item.element.nativeElement.disabled)
      [index]?.element.nativeElement.focus();
  }
}
