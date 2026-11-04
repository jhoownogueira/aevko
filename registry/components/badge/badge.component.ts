import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type AevkoBadgeVariant =
  'default' | 'secondary' | 'outline' | 'muted' | 'danger' | 'destructive' | 'ghost' | 'link';

@Component({
  selector: 'aevko-badge, a[aevkoBadge]',
  standalone: true,
  template: '<span class="icon"><ng-content select="[aevkoBadgeIcon]" /></span><ng-content />',
  styleUrl: './badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'badge', '[attr.data-variant]': 'variant()' },
})
export class AevkoBadge {
  readonly variant = input<AevkoBadgeVariant>('default');
}
