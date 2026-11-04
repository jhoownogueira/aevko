import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'span[aevkoKbdGroup]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './kbd-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'kbd-group' },
})
export class AevkoKbdGroup {}
