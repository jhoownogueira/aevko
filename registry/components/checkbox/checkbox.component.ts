import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'input[aevkoCheckbox][type="checkbox"]',
  standalone: true,
  template: '',
  styleUrl: './checkbox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.data-invalid]': 'invalid() ? "true" : null',
  },
})
export class AevkoCheckbox {
  readonly invalid = input(false, { transform: booleanAttribute });
}
