import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type AevkoAlertVariant = 'default' | 'muted' | 'danger';

@Component({
  selector: 'aevko-alert',
  standalone: true,
  template: `<span class="icon" aria-hidden="true"><ng-content select="[aevkoAlertIcon]" /></span>
    <div>
      <div class="title"><ng-content select="[aevkoAlertTitle]" /></div>
      <div class="description"><ng-content select="[aevkoAlertDescription]" /></div>
      <ng-content />
    </div>`,
  styleUrl: './alert.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'live() === "assertive" ? "alert" : "status"',
    '[attr.data-variant]': 'variant()',
  },
})
export class AevkoAlert {
  readonly variant = input<AevkoAlertVariant>('default');
  readonly live = input<'polite' | 'assertive'>('polite');
}
