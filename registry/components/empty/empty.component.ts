import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'aevko-empty',
  standalone: true,
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'empty' },
})
export class AevkoEmpty {}
