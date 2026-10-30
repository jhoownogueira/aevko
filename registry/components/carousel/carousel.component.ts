import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  contentChildren,
  effect,
  input,
  model,
  signal,
} from '@angular/core';

@Component({
  selector: 'aevko-carousel-slide',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './carousel-slide.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    '[hidden]': '!active()',
    '[attr.aria-roledescription]': '"slide"',
    '[attr.aria-label]': 'label()',
  },
})
export class AevkoCarouselSlide {
  readonly label = input<string>();
  readonly active = signal(false);
}

@Component({
  selector: 'aevko-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'region',
    '[attr.aria-roledescription]': '"carousel"',
    '[attr.aria-label]': 'label()',
    '(keydown)': 'keyboard($event)',
  },
})
export class AevkoCarousel {
  readonly label = input.required<string>();
  readonly index = model(0);
  readonly loop = input(false, { transform: booleanAttribute });
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  protected readonly slides = contentChildren(AevkoCarouselSlide);
  private pointerStart = 0;

  constructor() {
    effect(() => {
      const slides = this.slides();
      const safeIndex = Math.min(Math.max(this.index(), 0), Math.max(slides.length - 1, 0));
      if (safeIndex !== this.index()) this.index.set(safeIndex);
      slides.forEach((slide, index) => slide.active.set(index === safeIndex));
    });
  }
  protected previous(): void {
    this.go(this.index() - 1);
  }
  protected next(): void {
    this.go(this.index() + 1);
  }
  protected keyboard(event: KeyboardEvent): void {
    const previous = event.key === (this.orientation() === 'horizontal' ? 'ArrowLeft' : 'ArrowUp');
    const next = event.key === (this.orientation() === 'horizontal' ? 'ArrowRight' : 'ArrowDown');
    if (!previous && !next) return;
    event.preventDefault();
    previous ? this.previous() : this.next();
  }
  protected pointerDown(event: PointerEvent): void {
    this.pointerStart = this.orientation() === 'horizontal' ? event.clientX : event.clientY;
  }
  protected pointerUp(event: PointerEvent): void {
    const end = this.orientation() === 'horizontal' ? event.clientX : event.clientY;
    const delta = end - this.pointerStart;
    if (Math.abs(delta) >= 40) delta > 0 ? this.previous() : this.next();
  }
  private go(index: number): void {
    const count = this.slides().length;
    if (count === 0) return;
    if (this.loop()) this.index.set((index + count) % count);
    else this.index.set(Math.min(Math.max(index, 0), count - 1));
  }
}
