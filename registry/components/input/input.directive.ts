import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'input[aevkoInput]',
  standalone: true,
  template: '',
  styleUrl: './input.directive.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'input',
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.data-invalid]': 'invalid() ? "true" : null',
  },
})
export class AevkoInput {
  readonly invalid = input(false, { transform: booleanAttribute });
}
