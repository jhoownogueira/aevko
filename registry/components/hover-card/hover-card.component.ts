import { AevkoFloating } from '../shared/floating.directive';
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
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[aevkoHoverCardTrigger]',
  standalone: true,
  host: { 'data-slot': 'hover-card-trigger' },
})
export class AevkoHoverCardTrigger {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
}

@Component({
  selector: 'aevko-hover-card',
  standalone: true,
  imports: [AevkoFloating],
  templateUrl: './hover-card.component.html',
  styleUrl: './hover-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'hover-card-root',
    '(mouseenter)': 'schedule(true)',
    '(mouseleave)': 'schedule(false)',
    '(focusin)': 'schedule(true)',
    '(focusout)': 'schedule(false)',
    '(document:keydown.escape)': 'dismiss()',
  },
})
export class AevkoHoverCard implements OnDestroy {
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
  protected dismiss(): void {
    clearTimeout(this.timer);
    this.open.set(false);
  }
  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
