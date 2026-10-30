import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'aevko-marker',
  standalone: true,
  template: '<span class="dot" aria-hidden="true"></span><ng-content />',
  styleUrl: './marker.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-variant]': 'variant()' },
})
export class AevkoMarker {
  readonly variant = input<'default' | 'muted' | 'danger'>('default');
}
