import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'aevko-input-otp',
  standalone: true,
  templateUrl: './input-otp.component.html',
  styleUrl: './input-otp.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AevkoInputOtp),
      multi: true,
    },
  ],
  host: {
    '[attr.data-disabled]': 'isDisabled() ? "true" : null',
    '[attr.data-invalid]': 'invalid() ? "true" : null',
  },
})
export class AevkoInputOtp implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly maxLength = input(6);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly characters = input<RegExp>(/[0-9A-Za-z]/);
  readonly value = model('');
  protected readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly slots = computed(() =>
    Array.from({ length: Math.max(1, this.maxLength()) }, (_, index) => this.value()[index] ?? ''),
  );
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected update(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = [...input.value]
      .filter((character) => {
        const characters = this.characters();
        characters.lastIndex = 0;
        return characters.test(character);
      })
      .join('')
      .slice(0, this.maxLength());
    input.value = value;
    this.value.set(value);
    this.onChange(value);
  }

  protected touch(): void {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.value.set((value ?? '').slice(0, this.maxLength()));
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.formDisabled.set(disabled);
  }
}
