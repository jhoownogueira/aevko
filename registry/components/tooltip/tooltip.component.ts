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

@Directive({ selector: '[aevkoTooltipTrigger]', standalone: true })
export class AevkoTooltipTrigger {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
}

@Component({
  selector: 'aevko-tooltip',
  standalone: true,
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(mouseenter)': 'schedule(true)',
    '(mouseleave)': 'schedule(false)',
    '(focusin)': 'schedule(true)',
    '(focusout)': 'schedule(false)',
    '(keydown.escape)': 'open.set(false)',
  },
})
export class AevkoTooltip {
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
}
