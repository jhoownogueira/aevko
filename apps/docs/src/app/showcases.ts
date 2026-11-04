import { CodeEditor } from './code-editor';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

@Component({
  selector: 'aevko-themes-page',
  standalone: true,
  imports: [CodeEditor],
  template: `
    <section class="showcase-hero">
      <p class="eyebrow">Neutral foundations</p>
      <h1>Themes</h1>
      <p class="lede">
        Start from a restrained grayscale contract, then replace semantic variables with the
        identity your product needs.
      </p>
    </section>
    <section class="theme-grid">
      @for (theme of themes; track theme.name) {
        <article
          [style.--sample-background]="theme.background"
          [style.--sample-foreground]="theme.foreground"
          [style.--sample-muted]="theme.muted"
          [style.--sample-border]="theme.border"
        >
          <div class="theme-preview">
            <header>
              <b>{{ theme.name }}</b
              ><span></span>
            </header>
            <div class="theme-body">
              <aside></aside>
              <div><i></i><i></i><i></i></div>
            </div>
          </div>
          <footer>
            <div>
              <h2>{{ theme.name }}</h2>
              <p>{{ theme.description }}</p>
            </div>
            <button type="button" (click)="apply(theme)">Preview {{ theme.name }}</button>
          </footer>
        </article>
      }
    </section>
    <section class="theme-export" aria-label="Use the selected theme">
      <p role="status">{{ status() }}</p>
      <button type="button" (click)="reset()">Reset theme</button>
      @if (css()) {
        <aevko-code-editor
          [value]="css()"
          language="css"
          filename="styles.css"
          label="Selected theme CSS"
        />
      }
    </section>
    <section class="showcase-note">
      <h2>CSS variables, not a runtime theme</h2>
      <p>
        Each installed file reads semantic <code>--aevko-*</code> variables and keeps radius at zero
        by default. Tailwind utilities and plain CSS remain first-class overrides.
      </p>
      <a href="/theming">Open the theming guide →</a>
    </section>
  `,
  styleUrl: './showcases.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemesPage {
  private readonly document = inject(DOCUMENT);
  protected readonly themes = [
    {
      name: 'Paper',
      description: 'Soft white canvas with graphite text.',
      background: '#fafafa',
      foreground: '#18181b',
      muted: '#e4e4e7',
      border: '#d4d4d8',
    },
    {
      name: 'Carbon',
      description: 'Near-black surfaces with quiet contrast.',
      background: '#09090b',
      foreground: '#fafafa',
      muted: '#27272a',
      border: '#3f3f46',
    },
    {
      name: 'Stone',
      description: 'Warm neutral values for editorial products.',
      background: '#fafaf9',
      foreground: '#1c1917',
      muted: '#e7e5e4',
      border: '#d6d3d1',
    },
    {
      name: 'Slate',
      description: 'Cool neutral values for data-heavy tools.',
      background: '#f8fafc',
      foreground: '#0f172a',
      muted: '#e2e8f0',
      border: '#cbd5e1',
    },
  ];
  protected readonly status = signal('Select a theme to preview it on this site.');
  protected readonly css = signal('');
  protected reset(): void {
    const root = this.document.documentElement;
    for (const token of ['background', 'foreground', 'surface', 'border'])
      root.style.removeProperty('--aevko-' + token);
    root.dataset['theme'] = 'light';
    this.css.set('');
    this.status.set('Default light theme restored.');
  }
  protected apply(theme: (typeof this.themes)[number]): void {
    const root = this.document.documentElement;
    root.style.setProperty('--aevko-background', theme.background);
    root.style.setProperty('--aevko-foreground', theme.foreground);
    root.style.setProperty('--aevko-surface', theme.muted);
    root.style.setProperty('--aevko-border', theme.border);
    root.dataset['theme'] = theme.name === 'Carbon' ? 'dark' : 'light';
    this.status.set(
      theme.name + ' preview applied. Copy its CSS below to use it in your application.',
    );
    this.css.set(
      `:root${theme.name === 'Carbon' ? '[data-theme="dark"]' : ''} {\n  --aevko-background: ${theme.background};\n  --aevko-foreground: ${theme.foreground};\n  --aevko-surface: ${theme.muted};\n  --aevko-border: ${theme.border};\n}`,
    );
  }
}

@Component({
  selector: 'aevko-typeset-page',
  standalone: true,
  template: `
    <section class="showcase-hero">
      <p class="eyebrow">Type specimens</p>
      <h1>Typeset</h1>
      <p class="lede">
        Editorial patterns built from semantic HTML and ordinary CSS. Use the scale below to
        establish headings, body text and captions in your application.
      </p>
    </section>
    <article class="type-specimen">
      <header>
        <p>Field notes / 04</p>
        <h2>Interfaces should make the next decision feel obvious.</h2>
        <p class="type-deck">
          A durable design system is less about a fixed appearance and more about reliable
          relationships between content, controls and state.
        </p>
      </header>
      <div class="type-columns">
        <p>
          <strong>Start with meaning.</strong> Choose native elements for their semantics, then
          compose behavior around them. A button should remain a button; a table should remain
          navigable as a table.
        </p>
        <p>
          <strong>Keep ownership local.</strong> Source-owned components let teams inspect every
          tradeoff, remove unused behavior and align the final interface with a product’s own
          language.
        </p>
        <blockquote>
          Good defaults are an invitation to customize, not a visual identity imposed on every
          application.
        </blockquote>
      </div>
      <footer>
        <span>Semantic HTML · Responsive type</span
        ><a href="/getting-started">Use this foundation →</a>
      </footer>
    </article>
    <section class="type-scale" aria-label="Type scale">
      <p class="display">Display / 72</p>
      <p class="headline">Headline / 48</p>
      <p class="title">Title / 30</p>
      <p class="body">
        Body / 16 — Clear rhythm for product documentation and application content.
      </p>
      <p class="caption">Caption / 12 / uppercase tracking</p>
    </section>
  `,
  styleUrl: './showcases.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypesetPage {}
