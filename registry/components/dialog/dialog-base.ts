import {
  ElementRef,
  PLATFORM_ID,
  Directive,
  booleanAttribute,
  effect,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type AevkoOverlaySide = 'center' | 'top' | 'right' | 'bottom' | 'left';

@Directive()
export abstract class AevkoDialogBase {
  readonly title = input.required<string>();
  readonly description = input('');
  readonly open = model(false);
  readonly initialFocus = input('');
  readonly closeOnEscape = input(true, { transform: booleanAttribute });
  readonly closeOnBackdrop = input(true, { transform: booleanAttribute });
  readonly restoreFocus = input(true, { transform: booleanAttribute });
  readonly showCloseButton = input(true, { transform: booleanAttribute });
  readonly dialogRole = input<'dialog' | 'alertdialog'>('dialog');
  readonly side = input<AevkoOverlaySide>('center');
  protected readonly panel = viewChild<ElementRef<HTMLDialogElement>>('panel');
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private returnTarget: HTMLElement | null = null;

  protected constructor(
    private readonly triggerAttribute: string,
    private readonly closeAttribute: string,
  ) {
    effect(() => {
      const panel = this.panel()?.nativeElement;
      const shouldOpen = this.open();
      if (!this.browser || !panel) return;
      if (shouldOpen && !panel.open) {
        this.returnTarget = document.activeElement as HTMLElement | null;
        panel.showModal();
        this.focusInitial(panel);
      } else if (!shouldOpen && panel.open) {
        panel.close();
      }
    });
  }

  protected handleClick(event: MouseEvent): void {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest(`[${this.triggerAttribute}]`)) {
      this.open.set(true);
      return;
    }
    if (target.closest(`[${this.closeAttribute}]`)) this.open.set(false);
  }

  protected handleBackdrop(event: MouseEvent): void {
    if (this.closeOnBackdrop() && event.target === this.panel()?.nativeElement) {
      this.open.set(false);
    }
  }

  protected handleCancel(event: Event): void {
    if (!this.closeOnEscape()) {
      event.preventDefault();
      return;
    }
    this.open.set(false);
  }

  protected handleClose(): void {
    if (this.open()) this.open.set(false);
    if (this.restoreFocus()) this.returnTarget?.focus();
  }

  protected close(): void {
    this.open.set(false);
  }

  private focusInitial(panel: HTMLDialogElement): void {
    const selector = this.initialFocus().trim();
    const target = selector ? panel.querySelector<HTMLElement>(selector) : null;
    queueMicrotask(() => (target ?? panel.querySelector<HTMLElement>('[autofocus]'))?.focus());
  }
}
