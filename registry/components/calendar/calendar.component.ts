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
export interface AevkoCalendarDay {
  date: string;
  day: number;
  outside: boolean;
}
@Component({
  selector: 'aevko-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AevkoCalendar),
      multi: true,
    },
  ],
  host: {
    'data-slot': 'calendar',
    '[attr.data-disabled]': 'isDisabled() ? "true" : null',
  },
})
export class AevkoCalendar implements ControlValueAccessor {
  readonly label = input('Choose a date');
  readonly month = model('2026-01');
  readonly value = model('');
  readonly min = input('');
  readonly max = input('');
  readonly disabledState = input(false, { alias: 'disabled', transform: booleanAttribute });
  protected readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabledState() || this.formDisabled());
  protected readonly activeDate = signal('');
  protected readonly weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  protected readonly monthLabel = computed(() => {
    const [year, month] = this.parts();
    return new Intl.DateTimeFormat('en', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(Date.UTC(year, month - 1, 1)));
  });
  protected readonly days = computed<readonly AevkoCalendarDay[]>(() => {
    const [year, month] = this.parts();
    const first = new Date(Date.UTC(year, month - 1, 1));
    const start = new Date(first);
    start.setUTCDate(1 - first.getUTCDay());
    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + index);
      return {
        date: date.toISOString().slice(0, 10),
        day: date.getUTCDate(),
        outside: date.getUTCMonth() !== month - 1,
      };
    });
  });
  protected changeMonth(offset: number): void {
    if (this.isDisabled()) {
      return;
    }
    const [year, month] = this.parts();
    const date = new Date(Date.UTC(year, month - 1 + offset, 1));
    this.month.set(`${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`);
  }
  protected disabled(date: string): boolean {
    return (
      this.isDisabled() ||
      (!!this.min() && date < this.min()) ||
      (!!this.max() && date > this.max())
    );
  }
  protected select(date: string): void {
    if (!this.disabled(date)) {
      this.value.set(date);
      this.activeDate.set(date);
      this.month.set(date.slice(0, 7));
      this.onChange(date);
      this.onTouched();
    }
  }
  protected move(event: KeyboardEvent, date: string): void {
    if (this.isDisabled()) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.select(date);
      return;
    }
    const current = new Date(`${date}T00:00:00Z`);
    const day = current.getUTCDay();
    const offset = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
      Home: -day,
      End: 6 - day,
      PageUp: -28,
      PageDown: 28,
    }[event.key];
    if (offset === undefined) {
      return;
    }
    event.preventDefault();
    const next = new Date(current);
    next.setUTCDate(next.getUTCDate() + offset);
    const iso = next.toISOString().slice(0, 10);
    const grid = (event.currentTarget as HTMLElement).closest('[role="grid"]');
    if (this.disabled(iso)) {
      return;
    }
    this.activeDate.set(iso);
    this.month.set(iso.slice(0, 7));
    this.onTouched();
    queueMicrotask(() => grid?.querySelector<HTMLElement>(`[data-aevko-date="${iso}"]`)?.focus());
  }
  protected activate(date: string): void {
    if (!this.disabled(date)) {
      this.activeDate.set(date);
    }
  }

  writeValue(value: string | null): void {
    const next = value ?? '';
    this.value.set(next);
    this.activeDate.set(next);
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
  }

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;
  private parts(): [number, number] {
    const [year, month] = this.month().split('-').map(Number);
    return [year || 2026, month || 1];
  }
}
