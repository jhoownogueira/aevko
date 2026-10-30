import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type AevkoBadgeVariant = 'default' | 'outline' | 'muted' | 'danger';

@Component({
  selector: 'aevko-badge',
  standalone: true,
  template: '<span class="icon"><ng-content select="[aevkoBadgeIcon]" /></span><ng-content />',
  styleUrl: './badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-variant]': 'variant()' },
})
export class AevkoBadge {
  readonly variant = input<AevkoBadgeVariant>('default');
}
