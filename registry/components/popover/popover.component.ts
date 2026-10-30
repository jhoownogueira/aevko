import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  booleanAttribute,
  contentChild,
  effect,
  inject,
  input,
  model,
} from '@angular/core';

@Directive({ selector: '[aevkoPopoverTrigger]', standalone: true })
export class AevkoPopoverTrigger {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
}

@Component({
  selector: 'aevko-popover',
  standalone: true,
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(click)': 'click($event)', '(keydown)': 'keydown($event)' },
})
export class AevkoPopover {
  readonly label = input.required<string>();
  readonly open = model(false);
  readonly id = input('aevko-popover');
  readonly side = input<'top' | 'right' | 'bottom' | 'left'>('bottom');
  readonly align = input<'start' | 'center' | 'end'>('center');
  readonly closeOnEscape = input(true, { transform: booleanAttribute });
  private readonly trigger = contentChild(AevkoPopoverTrigger);
  constructor() {
    effect(() => {
      const element = this.trigger()?.element.nativeElement;
      if (!element) return;
      element.setAttribute('aria-haspopup', 'dialog');
      element.setAttribute('aria-expanded', String(this.open()));
      element.setAttribute('aria-controls', this.id());
    });
  }
  protected click(event: MouseEvent): void {
    const target = event.target as Element;
    if (target.closest('[aevkoPopoverTrigger]')) this.open.update((value) => !value);
    else if (target.closest('[aevkoPopoverClose]')) this.open.set(false);
  }
  protected keydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.closeOnEscape()) {
      event.preventDefault();
      this.open.set(false);
    }
  }
}
