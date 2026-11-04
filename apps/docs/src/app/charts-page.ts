import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CodeEditor } from './code-editor';
import { examples } from './examples/chart.examples';

@Component({
  selector: 'aevko-charts-page',
  standalone: true,
  imports: [NgComponentOutlet, RouterLink, CodeEditor],
  template: `
    <section class="hero">
      <p class="eyebrow">Charts / Angular + Chart.js</p>
      <h1>Make your data clear.</h1>
      <p class="lede">
        Interactive charts with considered typography, useful tooltips and accessible data. Choose a
        composition, explore it, then make it yours.
      </p>
      <div class="hero-links">
        <a href="#chart-gallery">Browse charts <span aria-hidden="true">↓</span></a
        ><a routerLink="/components/chart">Documentation <span aria-hidden="true">↗</span></a>
      </div>
    </section>
    <div class="charts-content">
      <article class="featured" aria-label="Interactive area chart example">
        <div class="preview"><ng-container *ngComponentOutlet="featured.component" /></div>
        <div class="example-footer">
          <span>Area chart · Interactive</span
          ><button
            type="button"
            [attr.aria-expanded]="open().has(featured.title)"
            (click)="toggle(featured.title)"
          >
            {{ open().has(featured.title) ? 'Hide code' : 'View code' }}
          </button>
        </div>
        @if (open().has(featured.title)) {
          <aevko-code-editor
            [value]="featured.code"
            filename="visitors.component.ts"
            language="typescript"
            label="Interactive visitors chart source"
          />
        }
      </article>
      <section id="chart-gallery" aria-label="Chart examples">
        <nav class="filters" aria-label="Chart category">
          @for (category of categories; track category) {
            <button
              type="button"
              [attr.aria-pressed]="selected() === category"
              (click)="selected.set(category)"
            >
              {{ category }}
            </button>
          }
        </nav>
        <div class="gallery">
          @for (example of filtered(); track example.title) {
            <article>
              <header>
                <p class="eyebrow">{{ example.title.split(' · ')[0] }}</p>
                <h2>{{ example.title.split(' · ')[1] }}</h2>
                <p>{{ example.description }}</p>
              </header>
              <div class="preview"><ng-container *ngComponentOutlet="example.component" /></div>
              <div class="example-footer">
                <span>Chart.js · Editable source</span
                ><button
                  type="button"
                  [attr.aria-expanded]="open().has(example.title)"
                  (click)="toggle(example.title)"
                >
                  {{ open().has(example.title) ? 'Hide code' : 'View code' }}
                </button>
              </div>
              @if (open().has(example.title)) {
                <aevko-code-editor
                  [value]="example.code"
                  filename="chart-example.component.ts"
                  language="typescript"
                  [label]="example.title + ' source'"
                />
              }
            </article>
          }
        </div>
      </section>
      <section class="install" aria-label="Chart installation">
        <div>
          <p class="eyebrow">From preview to product</p>
          <h2>Start with your next dashboard.</h2>
          <p>
            Install the chart source and Chart.js dependency with one command. Every example
            includes its own imports, data and styles.
          </p>
          <a routerLink="/blocks/dashboard-01">Explore the dashboard block →</a>
        </div>
        <aevko-code-editor
          value=""
          packageCommand="add chart --yes"
          language="shell"
          filename="Terminal"
          label="Install Chart"
        />
      </section>
    </div>
  `,
  styleUrl: './charts-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsPage {
  protected readonly featured = examples[0];
  protected readonly categories = [
    'All',
    'Area',
    'Bar',
    'Line',
    'Pie',
    'Doughnut',
    'Radar',
    'Radial',
  ];
  protected readonly selected = signal('All');
  protected readonly open = signal<ReadonlySet<string>>(new Set());
  protected readonly filtered = computed(() =>
    examples
      .slice(1)
      .filter(
        (example) => this.selected() === 'All' || example.title.startsWith(this.selected() + ' ·'),
      ),
  );
  protected toggle(title: string): void {
    this.open.update((current) => {
      const next = new Set(current);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }
}
