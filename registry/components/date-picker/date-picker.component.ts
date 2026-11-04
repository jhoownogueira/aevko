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
import { AevkoCalendar } from '../calendar';
import { AevkoPopover, AevkoPopoverTrigger } from '../popover';
@Component({
  selector: 'aevko-date-picker',
  standalone: true,
  imports: [AevkoCalendar, AevkoPopover, AevkoPopoverTrigger],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AevkoDatePicker),
      multi: true,
    },
  ],
  host: {
    'data-slot': 'date-picker',
    '[attr.data-disabled]': 'isDisabled() ? "true" : null',
  },
})
export class AevkoDatePicker implements ControlValueAccessor {
  readonly id = input('aevko-date-picker');
  readonly label = input.required<string>();
  readonly placeholder = input('Pick a date');
  readonly value = model('');
  readonly month = model('2026-01');
  readonly open = model(false);
  readonly min = input('');
  readonly max = input('');
  readonly disabled = input(false, { transform: booleanAttribute });
  protected readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly display = computed(() =>
    this.value()
      ? new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }).format(
          new Date(`${this.value()}T00:00:00Z`),
        )
      : this.placeholder(),
  );
  protected select(value: string): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
    this.open.set(false);
  }
  protected touch(): void {
    this.onTouched();
  }
  writeValue(value: string | null): void {
    const next = value ?? '';
    this.value.set(next);
    if (next) {
      this.month.set(next.slice(0, 7));
    }
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.formDisabled.set(disabled);
    if (disabled) {
      this.open.set(false);
    }
  }
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;
}
