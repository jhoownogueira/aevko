import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  forwardRef,
  input,
  linkedSignal,
  model,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type AevkoToggleVariant = 'default' | 'outline';
export type AevkoToggleSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'button[aevkoToggle]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AevkoToggle),
      multi: true,
    },
  ],
  template: '<ng-content />',
  styleUrl: './toggle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'toggle',
    type: 'button',
    '[attr.aria-pressed]': 'pressed()',
    '[attr.data-state]': 'pressed() ? "on" : "off"',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[disabled]': 'disabledState()',
    '(click)': 'toggle()',
    '(blur)': 'markTouched()',
  },
})
export class AevkoToggle implements ControlValueAccessor {
  readonly pressed = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly variant = input<AevkoToggleVariant>('default');
  readonly size = input<AevkoToggleSize>('md');
  protected readonly disabledState = linkedSignal(() => this.disabled());
  private onChange: (value: boolean) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected toggle(): void {
    if (this.disabledState()) return;
    this.pressed.update((value) => !value);
    this.onChange(this.pressed());
    this.onTouched();
  }

  protected markTouched(): void {
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.pressed.set(Boolean(value));
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabledState.set(disabled);
  }
}
