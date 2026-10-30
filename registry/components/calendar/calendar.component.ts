import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
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
})
export class AevkoCalendar {
  readonly label = input('Choose a date');
  readonly month = model('2026-01');
  readonly value = model('');
  readonly min = input('');
  readonly max = input('');
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
    const [year, month] = this.parts();
    const date = new Date(Date.UTC(year, month - 1 + offset, 1));
    this.month.set(`${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`);
  }
  protected disabled(date: string): boolean {
    return (!!this.min() && date < this.min()) || (!!this.max() && date > this.max());
  }
  protected select(date: string): void {
    if (!this.disabled(date)) {
      this.value.set(date);
      this.month.set(date.slice(0, 7));
    }
  }
  protected move(event: KeyboardEvent, date: string): void {
    const offset =
      event.key === 'ArrowLeft'
        ? -1
        : event.key === 'ArrowRight'
          ? 1
          : event.key === 'ArrowUp'
            ? -7
            : event.key === 'ArrowDown'
              ? 7
              : 0;
    if (!offset) return;
    event.preventDefault();
    const next = new Date(`${date}T00:00:00Z`);
    next.setUTCDate(next.getUTCDate() + offset);
    const iso = next.toISOString().slice(0, 10);
    const grid = (event.currentTarget as HTMLElement).closest('[role="grid"]');
    this.select(iso);
    queueMicrotask(() => grid?.querySelector<HTMLElement>(`[data-aevko-date="${iso}"]`)?.focus());
  }
  private parts(): [number, number] {
    const [year, month] = this.month().split('-').map(Number);
    return [year || 2026, month || 1];
  }
}
