import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'aevko-scroll-area',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './scroll-area.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.tabindex]': 'tabIndex()', '[attr.data-scrollbar]': 'scrollbar()' },
})
export class AevkoScrollArea {
  readonly tabIndex = input(0);
  readonly scrollbar = input<'auto' | 'thin' | 'hidden'>('auto');
}
