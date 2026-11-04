import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type AevkoKbdSize = 'sm' | 'md';

@Component({
  selector: 'kbd[aevkoKbd]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './kbd.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'kbd', '[attr.data-size]': 'size()' },
})
export class AevkoKbd {
  readonly size = input<AevkoKbdSize>('md');
}
