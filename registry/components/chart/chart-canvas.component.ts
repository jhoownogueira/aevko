import {
  afterNextRender,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import type { Chart, ChartConfiguration } from 'chart.js';

export type AevkoChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea';
export interface AevkoChartDataset {
  readonly label: string;
  readonly values: readonly (number | null)[];
  readonly color?: string;
  readonly fill?: boolean;
  readonly dashed?: boolean;
}
export interface AevkoChartData {
  readonly labels: readonly string[];
  readonly datasets: readonly AevkoChartDataset[];
}

@Component({
  selector: 'aevko-chart-canvas',
  standalone: true,
  templateUrl: './chart-canvas.component.html',
  styleUrl: './chart-canvas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'chart-canvas',
    '[attr.data-ready]': 'ready()',
    '[attr.data-type]': 'type()',
  },
})
export class AevkoChartCanvas {
  readonly label = input.required<string>();
  readonly data = input.required<AevkoChartData>();
  readonly type = input<AevkoChartType>('line');
  readonly height = input(280);
  readonly stacked = input(false);
  readonly horizontal = input(false);
  readonly smooth = input(true);
  readonly stepped = input(false);
  readonly showLegend = input(true);
  readonly valueFormat = input<'number' | 'currency' | 'percent'>('number');
  readonly currency = input('USD');
  protected readonly ready = signal(false);
  protected readonly error = signal(false);
  protected readonly hidden = signal<ReadonlySet<string>>(new Set());
  protected readonly palette = signal([
    '#18181b',
    '#71717a',
    '#a1a1aa',
    '#52525b',
    '#d4d4d8',
    '#3f3f46',
  ]);
  private readonly revision = signal(0);
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private chart?: Chart;
  private chartType?: AevkoChartType;
  private reducedMotion = false;
  protected readonly circular = computed(() =>
    ['pie', 'doughnut', 'polarArea'].includes(this.type()),
  );
  protected readonly hasData = computed(
    () =>
      this.data().labels.length > 0 &&
      this.data().datasets.some((series) =>
        series.values.some((value) => value !== null && Number.isFinite(value)),
      ),
  );
  protected readonly legend = computed(() =>
    this.circular()
      ? this.data().labels.map((label, index) => ({
          label,
          color: this.palette()[index % this.palette().length],
          key: `point:${label}`,
        }))
      : this.data().datasets.map((series, index) => ({
          label: series.label,
          color: series.color || this.palette()[index % this.palette().length],
          key: `series:${series.label}`,
        })),
  );

  constructor() {
    afterNextRender(() => {
      const view = this.element.nativeElement.ownerDocument.defaultView;
      if (!view) return;
      const media = view.matchMedia('(prefers-reduced-motion: reduce)');
      const updateMotion = () => {
        this.reducedMotion = media.matches;
        this.revision.update((value) => value + 1);
      };
      updateMotion();
      media.addEventListener('change', updateMotion);
      const observer = new MutationObserver(() => this.revision.update((value) => value + 1));
      observer.observe(this.element.nativeElement.ownerDocument.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'style', 'data-theme'],
      });
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        media.removeEventListener('change', updateMotion);
      });
    });
    afterRenderEffect((cleanup) => {
      const data = this.data();
      const type = this.type();
      const stacked = this.stacked();
      const horizontal = this.horizontal();
      const smooth = this.smooth();
      const stepped = this.stepped();
      const hidden = this.hidden();
      const format = this.valueFormat();
      const currency = this.currency();
      this.revision();
      let active = true;
      cleanup(() => {
        active = false;
      });
      if (!data.labels.length || !data.datasets.length) {
        this.chart?.destroy();
        this.chart = undefined;
        this.ready.set(false);
        return;
      }
      void import('chart.js/auto')
        .then(({ default: ChartJS }) => {
          if (!active || this.destroyRef.destroyed) return;
          const style = this.element.nativeElement.ownerDocument.defaultView!.getComputedStyle(
            this.element.nativeElement,
          );
          const foreground = style.getPropertyValue('--aevko-foreground').trim() || '#18181b';
          const muted = style.getPropertyValue('--aevko-muted').trim() || '#71717a';
          const border = style.getPropertyValue('--aevko-border').trim() || '#e4e4e7';
          const background = style.getPropertyValue('--aevko-background').trim() || '#fff';
          const defaults = [foreground, '#71717a', '#a1a1aa', '#52525b', '#d4d4d8', '#3f3f46'];
          const palette = defaults.map(
            (fallback, index) =>
              style.getPropertyValue(`--aevko-chart-${index + 1}`).trim() || fallback,
          );
          this.palette.set(palette);
          const circular = ['pie', 'doughnut', 'polarArea'].includes(type);
          const cartesian = type === 'line' || type === 'bar';
          const number = (value: number) =>
            new Intl.NumberFormat(
              'en',
              format === 'currency'
                ? { style: 'currency', currency, maximumFractionDigits: 0 }
                : format === 'percent'
                  ? { style: 'percent', maximumFractionDigits: 1 }
                  : { maximumFractionDigits: 1 },
            ).format(format === 'percent' ? value / 100 : value);
          const configuration: ChartConfiguration = {
            type,
            data: {
              labels: [...data.labels],
              datasets: data.datasets.map((series, index) => {
                const color = series.color || palette[index % palette.length];
                return {
                  label: series.label,
                  data: data.labels.map((label, i) =>
                    circular && hidden.has(`point:${label}`)
                      ? null
                      : Number.isFinite(series.values[i])
                        ? series.values[i]!
                        : null,
                  ),
                  hidden: !circular && hidden.has(`series:${series.label}`),
                  borderColor: circular ? background : color,
                  backgroundColor: circular
                    ? data.labels.map((_, i) => palette[i % palette.length])
                    : series.fill && /^#[\da-f]{6}$/i.test(color)
                      ? `${color}24`
                      : color,
                  borderWidth: type === 'bar' ? 0 : circular ? 3 : 2,
                  borderDash: series.dashed ? [5, 5] : [],
                  fill: series.fill ?? false,
                  tension: smooth ? 0.35 : 0,
                  stepped,
                  pointRadius: type === 'radar' ? 3 : 0,
                  pointHoverRadius: 5,
                  barPercentage: 0.7,
                  categoryPercentage: 0.8,
                };
              }),
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: this.reducedMotion ? false : { duration: 450 },
              color: muted,
              font: { family: style.fontFamily, size: 12 },
              indexAxis: horizontal && type === 'bar' ? 'y' : 'x',
              interaction: { mode: circular ? 'nearest' : 'index', intersect: false },
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: foreground,
                  titleColor: background,
                  bodyColor: background,
                  cornerRadius: 0,
                  padding: 12,
                  boxPadding: 5,
                  displayColors: true,
                  callbacks: {
                    label: (context) =>
                      `${context.dataset.label}: ${number(Number(circular ? context.raw : horizontal && type === 'bar' ? context.parsed.x : type === 'radar' ? context.parsed.r : context.parsed.y))}`,
                  },
                },
              },
              scales: cartesian
                ? {
                    x: {
                      stacked,
                      border: { display: false },
                      grid: { display: horizontal, color: border },
                      ticks: {
                        color: muted,
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 8,
                        ...(horizontal ? { callback: (value) => number(Number(value)) } : {}),
                      },
                    },
                    y: {
                      stacked,
                      beginAtZero: true,
                      border: { display: false },
                      grid: { display: !horizontal, color: border },
                      ticks: {
                        color: muted,
                        maxTicksLimit: 5,
                        ...(!horizontal ? { callback: (value) => number(Number(value)) } : {}),
                      },
                    },
                  }
                : type === 'radar' || type === 'polarArea'
                  ? {
                      r: {
                        beginAtZero: true,
                        grid: { color: border },
                        angleLines: { color: border },
                        pointLabels: { color: muted },
                        ticks: { display: false },
                      },
                    }
                  : {},
            },
          };
          if (this.chart && this.chartType === type) {
            this.chart.data = configuration.data;
            this.chart.options = configuration.options!;
            this.chart.update(this.reducedMotion ? 'none' : undefined);
          } else {
            this.chart?.destroy();
            this.chart = new ChartJS(this.canvas().nativeElement, configuration);
            this.chartType = type;
          }
          this.error.set(false);
          this.ready.set(true);
        })
        .catch(() => {
          if (active && !this.destroyRef.destroyed) {
            this.error.set(true);
            this.ready.set(false);
          }
        });
    });
    this.destroyRef.onDestroy(() => this.chart?.destroy());
  }

  protected toggle(key: string): void {
    this.hidden.update((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }
  protected format(value: number | null | undefined): string {
    if (value == null || !Number.isFinite(value)) return '—';
    return new Intl.NumberFormat(
      'en',
      this.valueFormat() === 'currency'
        ? { style: 'currency', currency: this.currency(), maximumFractionDigits: 0 }
        : this.valueFormat() === 'percent'
          ? { style: 'percent', maximumFractionDigits: 1 }
          : { maximumFractionDigits: 1 },
    ).format(this.valueFormat() === 'percent' ? value / 100 : value);
  }
}
