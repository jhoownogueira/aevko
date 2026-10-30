import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'aevko-skeleton',
  standalone: true,
  template: '',
  styleUrl: './skeleton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
})
export class AevkoSkeleton {}
