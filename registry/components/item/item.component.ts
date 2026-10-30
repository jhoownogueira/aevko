import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

export type AevkoItemVariant = 'default' | 'outline' | 'muted';

@Component({
  selector: 'aevko-item',
  standalone: true,
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-variant]': 'variant()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
  },
})
export class AevkoItem {
  readonly variant = input<AevkoItemVariant>('default');
  readonly disabled = input(false, { transform: booleanAttribute });
}
