import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'label[aevkoLabel]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './label.directive.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoLabel {}
