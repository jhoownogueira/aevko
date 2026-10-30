import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'select[aevkoNativeSelect]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './native-select.directive.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.data-invalid]': 'invalid() ? "true" : null',
  },
})
export class AevkoNativeSelect {
  readonly invalid = input(false, { transform: booleanAttribute });
}
