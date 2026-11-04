import {
  afterNextRender,
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
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CodeEditor } from './code-editor';
import { ManualInstallation } from './manual-installation';

@Component({
  selector: 'aevko-block-preview',
  standalone: true,
  imports: [RouterLink, CodeEditor, ManualInstallation],
  template: `
    <article>
      <header>
        <div>
          <p class="eyebrow">{{ slug() }}</p>
          <h2>{{ title() }}</h2>
          <p>{{ description() }}</p>
        </div>
        <a [routerLink]="'/blocks/' + slug()">Open block <span aria-hidden="true">↗</span></a>
      </header>
      <div class="toolbar">
        <div role="group" aria-label="Block view">
          <button
            type="button"
            [attr.aria-pressed]="mode() === 'preview'"
            (click)="mode.set('preview')"
          >
            Preview</button
          ><button type="button" [attr.aria-pressed]="mode() === 'code'" (click)="mode.set('code')">
            Code
          </button>
        </div>
        @if (mode() === 'preview') {
          <div class="sizes" role="group" aria-label="Preview width">
            @for (size of sizes; track size.label) {
              <button
                type="button"
                [attr.aria-pressed]="width() === size.width"
                (click)="width.set(size.width)"
              >
                {{ size.label }}
              </button>
            }
          </div>
          <button type="button" (click)="refresh()" aria-label="Refresh block preview">↻</button>
        }
      </div>
      @if (mode() === 'preview') {
        <div class="preview-stage">
          <div class="frame-wrap" [style.width]="width() || '100%'">
            @for (key of [revision()]; track key) {
              <iframe
                #frame
                [src]="source()"
                [title]="title() + ' interactive preview'"
                loading="lazy"
                (load)="syncTheme()"
              ></iframe>
            }
          </div>
        </div>
      } @else {
        <div class="source"><aevko-manual-installation [slug]="slug()" kind="blocks" /></div>
      }
      <aevko-code-editor
        value=""
        [packageCommand]="'add ' + slug() + ' --yes'"
        language="shell"
        filename="Terminal"
        [label]="'Install ' + title()"
      />
      @if (slug().startsWith('login-') || slug().startsWith('signup-')) {
        <p class="integration-note">
          Form preview: no credentials are sent. Handle <code>(submitted)</code> to connect your
          authentication service; the event contains email, password, name and remember. Configure
          <code>alternateUrl</code> and <code>recoveryUrl</code> to show your application links.
          Passwords are cleared after submission. Provider sign-in requires your own integration.
        </p>
      }
      @if (slug().startsWith('sidebar-') || slug() === 'dashboard-01') {
        <p class="integration-note">
          Sample workspace data. Created projects remain in memory until this preview reloads.
        </p>
      }
    </article>
  `,
  styles: `
    :host {
      display: block;
      min-width: 0;
    }
    .integration-note {
      padding: 1rem;
      margin: 0;
      font-size: 0.875rem;
      line-height: 1.6;
      color: var(--aevko-muted);
    }
    article {
      border: 1px solid var(--aevko-border);
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.5rem;
    }
    h2 {
      font-size: 1.125rem;
      font-weight: 550;
      letter-spacing: -0.025em;
      margin: 0 0 0.5rem;
    }
    p {
      font-size: 0.8125rem;
      color: var(--aevko-muted);
      line-height: 1.6;
      margin: 0;
    }
    .eyebrow {
      font-size: 0.6875rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }
    a {
      color: inherit;
      text-decoration: none;
      font-size: 0.8125rem;
      white-space: nowrap;
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-block: 1px solid var(--aevko-border);
    }
    .sizes {
      margin-inline-start: auto;
    }
    button {
      font: inherit;
      font-size: 0.75rem;
      background: transparent;
      color: inherit;
      cursor: pointer;
      padding: 0.5rem 0.75rem;
      border: 0;
    }
    button[aria-pressed='true'],
    button:hover {
      background: var(--aevko-surface);
    }
    button:focus-visible,
    a:focus-visible {
      outline: 2px solid var(--aevko-focus);
      outline-offset: 2px;
    }
    .preview-stage {
      background: var(--aevko-surface);
      padding: 1rem;
      overflow: hidden;
    }
    .frame-wrap {
      margin-inline: auto;
      max-width: 100%;
      background: var(--aevko-background);
      border: 1px solid var(--aevko-border);
      box-sizing: border-box;
    }
    iframe {
      display: block;
      width: 100%;
      height: 46rem;
      border: 0;
    }
    .source {
      padding: 1.5rem;
      max-height: 48rem;
      overflow: auto;
    }
    @media (max-width: 600px) {
      header {
        padding: 1rem;
        align-items: start;
        flex-direction: column;
      }
      .preview-stage {
        padding: 0;
      }
      .frame-wrap {
        border-inline: 0;
      }
      .sizes {
        margin-inline-start: 0;
      }
      iframe {
        height: 40rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockPreview {
  readonly slug = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input('');
  private readonly sanitizer = inject(DomSanitizer);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly frame = viewChild<ElementRef<HTMLIFrameElement>>('frame');
  protected readonly mode = signal<'preview' | 'code'>('preview');
  protected readonly width = signal('');
  protected readonly revision = signal(0);
  protected readonly sizes = [
    { label: 'Desktop', width: '' },
    { label: 'Tablet', width: '768px' },
    { label: 'Mobile', width: '390px' },
  ];
  protected readonly source = computed(() => {
    const slug = this.slug();
    if (!/^[a-z0-9-]+$/.test(slug)) throw new Error('Invalid block slug');
    return this.sanitizer.bypassSecurityTrustResourceUrl('/blocks/preview/' + slug);
  });
  constructor() {
    afterNextRender(() => {
      const observer = new MutationObserver(() => this.syncTheme());
      observer.observe(this.host.nativeElement.ownerDocument.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'style', 'class'],
      });
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
  protected syncTheme(): void {
    const root = this.frame()?.nativeElement.contentDocument?.documentElement;
    if (!root) return;
    const parent = this.host.nativeElement.ownerDocument.documentElement;
    root.dataset['theme'] = parent.dataset['theme'];
    root.style.cssText = parent.style.cssText;
  }
  protected refresh(): void {
    this.revision.update((value) => value + 1);
  }
}
