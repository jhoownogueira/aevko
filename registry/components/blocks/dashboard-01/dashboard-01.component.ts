import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { AevkoChartCanvas } from '../../chart';
import { AevkoBadge } from '../../badge';
import { AevkoButton } from '../../button';
import { AEVKO_CARD_IMPORTS } from '../../card';
import { AevkoSidebar } from '../../sidebar';
import {
  AevkoTable,
  AevkoTableBody,
  AevkoTableCell,
  AevkoTableContainer,
  AevkoTableHead,
  AevkoTableHeader,
  AevkoTableRow,
} from '../../table';

@Component({
  selector: 'aevko-dashboard-01-block',
  standalone: true,
  imports: [
    AevkoChartCanvas,
    AevkoBadge,
    AevkoButton,
    AevkoSidebar,
    AevkoTable,
    AevkoTableBody,
    AevkoTableCell,
    AevkoTableContainer,
    AevkoTableHead,
    AevkoTableHeader,
    AevkoTableRow,
    ...AEVKO_CARD_IMPORTS,
  ],
  templateUrl: './dashboard-01.component.html',
  styleUrl: './dashboard-01.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'dashboard-01' },
})
export class AevkoDashboard01Block {
  readonly metrics = computed(() => [
    {
      label: 'Total revenue',
      value: new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(this.totalRevenue()),
      trend:
        '↗ ' +
        (
          (this.totalRevenue() /
            this.revenue().datasets[1].values.reduce((sum, value) => sum + value, 0) -
            1) *
          100
        ).toFixed(1) +
        '% from last period',
      note: 'Revenue across all channels · ' + this.period() + ' months',
    },
    {
      label: 'Active accounts',
      value: '2,840',
      trend: '↗ 8.2% from last period',
      note: 'Customers using your product',
    },
    {
      label: 'Conversion rate',
      value: '4.8%',
      trend: '↗ 0.6 percentage points',
      note: 'Visitors becoming customers',
    },
    {
      label: 'Net retention',
      value: '108%',
      trend: '↗ 3.1 percentage points',
      note: 'Growth within existing accounts',
    },
  ]);
  readonly period = signal('6');
  readonly query = signal('');
  readonly creating = signal(false);
  readonly projectName = signal('');
  readonly notice = signal('');
  readonly projects = signal([
    { name: 'Atlas migration', owner: 'Platform', status: 'On track', progress: '82%' },
    { name: 'Checkout refresh', owner: 'Commerce', status: 'At risk', progress: '58%' },
    { name: 'Research portal', owner: 'Insights', status: 'On track', progress: '71%' },
    { name: 'Mobile foundations', owner: 'Product', status: 'Planning', progress: '24%' },
  ]);
  readonly filteredProjects = computed(() =>
    this.projects().filter((project) =>
      `${project.name} ${project.owner} ${project.status}`
        .toLowerCase()
        .includes(this.query().toLowerCase()),
    ),
  );
  readonly revenue = computed(() => {
    const count = Number(this.period());
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].slice(-count),
      datasets: [
        {
          label: 'Revenue',
          values: [18400, 22800, 20600, 28400, 24600, 32400].slice(-count),
          fill: true,
        },
        {
          label: 'Previous period',
          values: [14200, 16800, 18200, 21400, 19800, 24200].slice(-count),
          dashed: true,
        },
      ],
    };
  });
  readonly totalRevenue = computed(() =>
    this.revenue().datasets[0].values.reduce((sum, value) => sum + value, 0),
  );
  readonly channels = computed(() => {
    const total = this.totalRevenue();
    const direct = Math.round(total * 0.44);
    const search = Math.round(total * 0.33);
    return {
      labels: ['Direct', 'Search', 'Partners'],
      datasets: [{ label: 'Revenue', values: [direct, search, total - direct - search] }],
    };
  });
  readonly exportUrl = computed(
    () =>
      'data:text/csv;charset=utf-8,' +
      encodeURIComponent(
        'Project,Owner,Status,Progress\n' +
          this.filteredProjects()
            .map((project) =>
              [project.name, project.owner, project.status, project.progress]
                .map((value) => '"' + value.replaceAll('"', '""') + '"')
                .join(','),
            )
            .join('\n'),
      ),
  );
  addProject(event: Event): void {
    event.preventDefault();
    const name = this.projectName().trim();
    if (!name) return;
    if (this.projects().some((project) => project.name.toLowerCase() === name.toLowerCase())) {
      this.notice.set('A project with this name already exists.');
      return;
    }
    this.projects.update((projects) => [
      ...projects,
      { name, owner: 'Product', status: 'Planning', progress: '0%' },
    ]);
    this.projectName.set('');
    this.query.set('');
    this.creating.set(false);
    this.notice.set('Project created.');
  }
}
