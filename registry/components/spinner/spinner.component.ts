import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'aevko-spinner',
  standalone: true,
  template: '<span class="ring" aria-hidden="true"></span>',
  styleUrl: './spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'status',
    '[attr.aria-label]': 'label()',
    '[style.--aevko-spinner-size]': 'size()',
  },
})
export class AevkoSpinner {
  readonly label = input('Loading');
  readonly size = input('1rem');
}
