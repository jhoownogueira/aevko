import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'fieldset[aevkoRadioGroup]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './radio-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-invalid]': 'invalid() ? "true" : null',
  },
})
export class AevkoRadioGroup {
  readonly orientation = input<'horizontal' | 'vertical'>('vertical');
  readonly invalid = input(false, { transform: booleanAttribute });
}

@Component({
  selector: 'input[aevkoRadioGroupItem][type="radio"]',
  standalone: true,
  template: '',
  styleUrl: './radio-group-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.aria-invalid]': 'invalid() ? "true" : null' },
})
export class AevkoRadioGroupItem {
  readonly invalid = input(false, { transform: booleanAttribute });
}
