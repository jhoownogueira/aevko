import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'input[aevkoSwitch][type="checkbox"]',
  standalone: true,
  template: '',
  styleUrl: './switch.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'switch',
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.data-invalid]': 'invalid() ? "true" : null',
    '[attr.data-size]': 'size()',
  },
})
export class AevkoSwitch {
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly size = input<'sm' | 'md'>('md');
}
