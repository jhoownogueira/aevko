import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'input[aevkoSlider][type="range"]',
  standalone: true,
  template: '',
  styleUrl: './slider.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.data-orientation]': 'orientation()',
  },
})
export class AevkoSlider {
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
}
