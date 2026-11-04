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
  selector: '[aevkoTooltipTrigger]',
  standalone: true,
  host: { 'data-slot': 'tooltip-trigger' },
})
export class AevkoTooltipTrigger {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
}

@Component({
  selector: 'aevko-tooltip',
  standalone: true,
  imports: [AevkoFloating],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'tooltip-root',
    '(mouseenter)': 'schedule(true)',
    '(mouseleave)': 'schedule(false)',
    '(focusin)': 'schedule(true)',
    '(focusout)': 'schedule(false)',
    '(document:keydown.escape)': 'dismiss()',
  },
})
export class AevkoTooltip implements OnDestroy {
  readonly id = input('aevko-tooltip');
  readonly open = model(false);
  readonly side = input<'top' | 'right' | 'bottom' | 'left'>('top');
  readonly delay = input(300);
  private readonly trigger = contentChild(AevkoTooltipTrigger);
  private timer?: ReturnType<typeof setTimeout>;
  constructor() {
    effect(() => {
      const element = this.trigger()?.element.nativeElement;
      if (!element) return;
      element.setAttribute('aria-describedby', this.id());
    });
  }
  protected schedule(value: boolean): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.open.set(value), value ? this.delay() : 0);
  }
  protected dismiss(): void {
    clearTimeout(this.timer);
    this.open.set(false);
  }
  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
