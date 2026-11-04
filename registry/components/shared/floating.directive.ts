import {
  afterEveryRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  booleanAttribute,
} from '@angular/core';

/** Keeps non-modal surfaces inside the viewport without changing focus ownership. */
@Directive({ selector: '[aevkoFloating]', standalone: true })
export class AevkoFloating {
  readonly aevkoFloating = input(true, { transform: booleanAttribute });
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroy = inject(DestroyRef);
  constructor() {
    afterEveryRender(() => this.position());
    const view = this.element.ownerDocument.defaultView;
    if (view) {
      const update = () => this.position();
      view.addEventListener('resize', update);
      view.addEventListener('scroll', update, true);
      this.destroy.onDestroy(() => {
        view.removeEventListener('resize', update);
        view.removeEventListener('scroll', update, true);
      });
    }
  }
  private position(): void {
    const panel = this.element;
    const view = panel.ownerDocument.defaultView;
    if (!view || panel.hidden || !this.aevkoFloating()) return;
    const anchor = panel.parentElement?.querySelector<HTMLElement>(
      '[data-slot$="trigger"], input, button',
    );
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const margin = 8;
    const gap = 6;
    const width = view.innerWidth;
    const height = view.innerHeight;
    if (panel.getAttribute('role') === 'listbox') panel.style.width = `${rect.width}px`;
    panel.style.position = 'fixed';
    panel.style.inset = 'auto';
    panel.style.transform = 'none';
    panel.style.boxSizing = 'border-box';
    panel.style.maxWidth = `${width - margin * 2}px`;
    panel.style.maxHeight = `${height - margin * 2}px`;
    panel.style.overflow = 'auto';
    const size = panel.getBoundingClientRect();
    const side = panel.dataset['side'] ?? 'bottom';
    const align = panel.dataset['align'] ?? 'start';
    let x =
      align === 'end'
        ? rect.right - size.width
        : align === 'center'
          ? rect.left + (rect.width - size.width) / 2
          : rect.left;
    let y = rect.bottom + gap;
    if (side === 'top') y = rect.top - size.height - gap;
    if (side === 'left' || side === 'right') {
      x = side === 'left' ? rect.left - size.width - gap : rect.right + gap;
      y = rect.top;
    } else if (y + size.height > height - margin && rect.top > height - rect.bottom) {
      y = rect.top - size.height - gap;
    } else if (y < margin) y = rect.bottom + gap;
    panel.style.left = `${Math.max(margin, Math.min(x, width - size.width - margin))}px`;
    panel.style.top = `${Math.max(margin, Math.min(y, height - size.height - margin))}px`;
  }
}
