import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

export type AevkoSeparatorOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'aevko-separator',
  standalone: true,
  template: '',
  styleUrl: './separator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'decorative() ? "none" : "separator"',
    '[attr.aria-orientation]': 'decorative() ? null : orientation()',
    '[attr.data-orientation]': 'orientation()',
  },
})
export class AevkoSeparator {
  readonly orientation = input<AevkoSeparatorOrientation>('horizontal');
  readonly decorative = input(true, { transform: booleanAttribute });
}
