import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'aevko-button-group',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './button-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    '[attr.aria-label]': 'label()',
    '[attr.data-orientation]': 'orientation()',
  },
})
export class AevkoButtonGroup {
  readonly label = input.required<string>();
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
}
