import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'aevko-empty',
  standalone: true,
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoEmpty {}
