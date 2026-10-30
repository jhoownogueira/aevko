import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  contentChild,
  effect,
  inject,
  input,
  model,
} from '@angular/core';

@Directive({ selector: '[aevkoHoverCardTrigger]', standalone: true })
export class AevkoHoverCardTrigger {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
}

@Component({
  selector: 'aevko-hover-card',
  standalone: true,
  templateUrl: './hover-card.component.html',
  styleUrl: './hover-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(mouseenter)': 'schedule(true)',
    '(mouseleave)': 'schedule(false)',
    '(focusin)': 'schedule(true)',
    '(focusout)': 'schedule(false)',
    '(keydown.escape)': 'open.set(false)',
  },
})
export class AevkoHoverCard {
  readonly id = input('aevko-hover-card');
  readonly open = model(false);
  readonly side = input<'top' | 'right' | 'bottom' | 'left'>('bottom');
  readonly align = input<'start' | 'center' | 'end'>('center');
  readonly delay = input(150);
  readonly closeDelay = input(200);
  private timer?: ReturnType<typeof setTimeout>;
  private readonly trigger = contentChild(AevkoHoverCardTrigger);
  constructor() {
    effect(() => {
      const element = this.trigger()?.element.nativeElement;
      if (!element) return;
      element.setAttribute('aria-describedby', this.id());
    });
  }
  protected schedule(value: boolean): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.open.set(value), value ? this.delay() : this.closeDelay());
  }
}
