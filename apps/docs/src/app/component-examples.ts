import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  Type,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { CodeEditor } from './code-editor';
import { exampleLoaders } from './example-loaders';
interface ComponentExample {
  title: string;
  description: string;
  component: Type<unknown>;
  code: string;
  dependencies: string[];
}
@Component({
  selector: 'aevko-component-examples',
  standalone: true,
  imports: [NgComponentOutlet, CodeEditor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Examples</h2>
    @if (loading()) {
      <p role="status">Loading interactive examples…</p>
    }
    @if (error()) {
      <p role="alert">{{ error() }}</p>
    }
    @for (example of examples(); track example.title; let index = $index) {
      <section
        [attr.aria-labelledby]="slug() + '-example-title-' + index"
        [attr.data-example]="index"
      >
        <h3 [id]="slug() + '-example-title-' + index">{{ example.title }}</h3>
        <p class="description">{{ example.description }}</p>
        <div class="example-shell">
          <div class="example-preview"><ng-container *ngComponentOutlet="example.component" /></div>
          <button
            type="button"
            class="code-toggle"
            [attr.aria-expanded]="expanded().includes(index)"
            [attr.aria-controls]="slug() + '-example-code-' + index"
            (click)="toggle(index)"
          >
            {{ expanded().includes(index) ? 'Hide code' : 'View code' }}
          </button>
          @if (expanded().includes(index)) {
            <div [id]="slug() + '-example-code-' + index" class="example-code">
              <p class="source-note">
                Standalone Angular example. Install the components used below, then place the
                example beside your <code>ui</code> directory.
              </p>
              <aevko-code-editor
                value=""
                [packageCommand]="'add ' + example.dependencies.join(' ') + ' --yes'"
                language="shell"
                filename="Terminal"
                label="Install example dependencies"
              />
              <aevko-code-editor
                [value]="example.code"
                language="typescript"
                filename="example.component.ts"
                [label]="example.title + ' complete Angular example'"
              />
            </div>
          }
        </div>
      </section>
    }
  `,
  styles: `
    :host {
      display: block;
      margin-block: 3rem;
      scroll-margin-top: 5rem;
    }
    h2 {
      font-size: 1.75rem;
      letter-spacing: -0.03em;
      margin: 0 0 2rem;
    }
    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 0.5rem;
    }
    section {
      margin-block: 2.5rem;
    }
    .description,
    .source-note {
      color: var(--aevko-muted);
      font-size: 0.875rem;
      line-height: 1.6;
      margin: 0.5rem 0 1.25rem;
    }
    .example-shell {
      border: 1px solid var(--aevko-border);
    }
    .example-preview {
      padding: clamp(1.25rem, 5vw, 3rem);
      min-width: 0;
      min-height: 10rem;
      display: grid;
      align-items: center;
    }
    .code-toggle {
      display: block;
      margin: 0 auto;
      border: 0;
      background: var(--aevko-surface);
      color: var(--aevko-foreground);
      padding: 0.625rem 1rem;
      cursor: pointer;
      font: inherit;
      font-size: 0.75rem;
    }
    .code-toggle:focus-visible {
      outline: 2px solid var(--aevko-focus);
      outline-offset: 2px;
    }
    .example-code {
      border-top: 1px solid var(--aevko-border);
      padding: 1rem;
      min-width: 0;
    }
  `,
})
export class ComponentExamples {
  readonly slug = input.required<string>();
  protected readonly examples = signal<readonly ComponentExample[]>([]);
  protected readonly expanded = signal<number[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  constructor() {
    afterRenderEffect((cleanup) => {
      const slug = this.slug();
      let active = true;
      cleanup(() => (active = false));
      this.loading.set(true);
      this.error.set('');
      this.expanded.set([]);
      const load = exampleLoaders[slug as keyof typeof exampleLoaders];
      if (!load) {
        this.examples.set([]);
        this.loading.set(false);
        return;
      }
      void load()
        .then((examples) => {
          if (active) this.examples.set(examples);
        })
        .catch(() => {
          if (active) this.error.set('Unable to load examples. Reload the page to try again.');
        })
        .finally(() => {
          if (active) this.loading.set(false);
        });
    });
  }
  protected toggle(index: number): void {
    this.expanded.update((current) =>
      current.includes(index) ? current.filter((value) => value !== index) : [...current, index],
    );
  }
}
