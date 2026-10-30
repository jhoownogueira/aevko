import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { AevkoCalendar } from '../calendar';
import { AevkoPopover, AevkoPopoverTrigger } from '../popover';
@Component({
  selector: 'aevko-date-picker',
  standalone: true,
  imports: [AevkoCalendar, AevkoPopover, AevkoPopoverTrigger],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoDatePicker {
  readonly label = input.required<string>();
  readonly placeholder = input('Pick a date');
  readonly value = model('');
  readonly month = model('2026-01');
  readonly open = model(false);
  readonly min = input('');
  readonly max = input('');
  protected readonly display = computed(() =>
    this.value()
      ? new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' }).format(
          new Date(`${this.value()}T00:00:00Z`),
        )
      : this.placeholder(),
  );
  protected select(value: string): void {
    this.value.set(value);
    this.open.set(false);
  }
}
