import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface AevkoChartSeries {
  readonly key: string;
  readonly label: string;
  readonly color?: string;
}

@Component({
  selector: 'aevko-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'figure', '[attr.aria-label]': 'label()' },
})
export class AevkoChart {
  readonly label = input.required<string>();
  readonly description = input('');
  readonly series = input<readonly AevkoChartSeries[]>([]);
}
