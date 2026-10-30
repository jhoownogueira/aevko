import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

export const AEVKO_BUTTON_VARIANTS = ['primary', 'outline', 'ghost', 'accent', 'danger'] as const;
export const AEVKO_BUTTON_SIZES = ['sm', 'md', 'lg'] as const;

export type AevkoButtonVariant = (typeof AEVKO_BUTTON_VARIANTS)[number];
export type AevkoButtonSize = (typeof AEVKO_BUTTON_SIZES)[number];
export type AevkoButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'button[aevkoButton]',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.type]': 'type()',
    '[disabled]': 'isDisabled',
    '[attr.aria-busy]': 'loading() ? "true" : null',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-loading]': 'loading() ? "true" : null',
    '(click)': 'guardActivation($event)',
  },
})
export class AevkoButton {
  readonly variant = input<AevkoButtonVariant>('primary');
  readonly size = input<AevkoButtonSize>('md');
  readonly type = input<AevkoButtonType>('button');
  readonly loading = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });

  protected get isDisabled(): boolean {
    return this.disabled() || this.loading();
  }

  protected guardActivation(event: MouseEvent): void {
    if (!this.isDisabled) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}
