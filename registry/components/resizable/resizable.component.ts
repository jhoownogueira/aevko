import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'aevko-resizable',
  standalone: true,
  templateUrl: './resizable.component.html',
  styleUrl: './resizable.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-orientation]': 'orientation()',
    '[style.--aevko-resizable-grid]': 'gridTemplate()',
  },
})
export class AevkoResizable {
  private readonly platformId = inject(PLATFORM_ID);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly size = model(50);
  readonly min = input(15);
  readonly max = input(85);
  readonly step = input(5);
  readonly storageKey = input<string | null>(null);
  protected readonly gridTemplate = computed(() => `${this.size()}fr auto ${100 - this.size()}fr`);

  constructor() {
    afterNextRender(() => {
      const key = this.storageKey();
      const stored = key ? Number(localStorage.getItem(key)) : Number.NaN;
      if (Number.isFinite(stored)) this.setSize(stored);
    });
  }

  protected start(event: PointerEvent): void {
    const handle = event.currentTarget as HTMLElement;
    handle.setPointerCapture(event.pointerId);
  }
  protected move(event: PointerEvent): void {
    const handle = event.currentTarget as HTMLElement;
    if (!handle.hasPointerCapture(event.pointerId)) return;
    const rect = handle.parentElement!.getBoundingClientRect();
    const value =
      this.orientation() === 'horizontal'
        ? ((event.clientX - rect.left) / rect.width) * 100
        : ((event.clientY - rect.top) / rect.height) * 100;
    this.setSize(value);
  }
  protected keyboard(event: KeyboardEvent): void {
    const negative = event.key === (this.orientation() === 'horizontal' ? 'ArrowLeft' : 'ArrowUp');
    const positive =
      event.key === (this.orientation() === 'horizontal' ? 'ArrowRight' : 'ArrowDown');
    if (!negative && !positive && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    if (event.key === 'Home') this.setSize(this.min());
    else if (event.key === 'End') this.setSize(this.max());
    else this.setSize(this.size() + (positive ? this.step() : -this.step()));
  }
  private setSize(value: number): void {
    const next = Math.min(this.max(), Math.max(this.min(), Math.round(value * 10) / 10));
    this.size.set(next);
    if (isPlatformBrowser(this.platformId) && this.storageKey())
      localStorage.setItem(this.storageKey()!, String(next));
  }
}
