import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { LucideCheck, LucideCopy, LucideSquareTerminal } from '@lucide/angular';
import type * as MonacoApi from 'monaco-editor';

type MonacoEditor = MonacoApi.editor.IStandaloneCodeEditor;
type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';
const packageManagers: readonly PackageManager[] = ['npm', 'pnpm', 'yarn', 'bun'];
let monacoPromise: Promise<typeof MonacoApi> | undefined;

function formatHtml(source: string): string {
  const tokens = source.match(/<[^>]+>|[^<]+/g) ?? [source];
  const voidElements = new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
  ]);
  let depth = 0;
  return tokens
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((token) => {
      const closing = /^<\//.test(token);
      const tag = token.match(/^<\/?([\w-]+)/)?.[1]?.toLowerCase();
      if (closing) depth = Math.max(0, depth - 1);
      const line = `${'  '.repeat(depth)}${token}`;
      if (
        tag &&
        !closing &&
        !token.startsWith('<!') &&
        !token.endsWith('/>') &&
        !voidElements.has(tag)
      ) {
        depth += 1;
      }
      return line;
    })
    .join('\n');
}

function loadMonaco(): Promise<typeof MonacoApi> {
  if (window.monaco) return Promise.resolve(window.monaco);
  if (monacoPromise) return monacoPromise;
  monacoPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-monaco-loader]');
    const script = existing ?? document.createElement('script');
    const start = () => {
      window.require.config({ paths: { vs: '/monaco/vs' } });
      window.MonacoEnvironment = {
        getWorkerUrl: () => '/monaco/vs/base/worker/workerMain.js',
      };
      window.require(['vs/editor/editor.main'], () => resolve(window.monaco));
    };
    if (existing) {
      existing.addEventListener('load', start, { once: true });
      return;
    }
    script.src = '/monaco/vs/loader.js';
    script.dataset['monacoLoader'] = 'true';
    script.addEventListener('load', start, { once: true });
    script.addEventListener('error', () => reject(new Error('Monaco loader failed.')), {
      once: true,
    });
    document.head.append(script);
  });
  return monacoPromise;
}

@Component({
  selector: 'aevko-code-editor',
  standalone: true,
  imports: [LucideCheck, LucideCopy, LucideSquareTerminal],
  template: `
    <section class="editor-shell" [attr.aria-label]="label()">
      <header>
        <div class="editor-meta">
          @if (packageCommand()) {
            <svg lucideSquareTerminal class="editor-icon" aria-hidden="true"></svg>
          } @else {
            <span>{{ filename() }}</span>
          }
        </div>
        <div class="editor-actions">
          @if (packageCommand()) {
            <div class="package-managers" role="group" aria-label="Package manager">
              @for (manager of managers; track manager) {
                <button
                  type="button"
                  [class.active]="activeManager() === manager"
                  [attr.aria-pressed]="activeManager() === manager"
                  (click)="activeManager.set(manager)"
                >
                  {{ manager }}
                </button>
              }
            </div>
          } @else {
            <span>{{ languageLabel() }}</span>
          }
          <button class="copy" type="button" (click)="copy()" [attr.aria-label]="copyLabel()">
            @if (copied()) {
              <svg lucideCheck class="editor-icon" aria-hidden="true"></svg>
            } @else {
              <svg lucideCopy class="editor-icon" aria-hidden="true"></svg>
            }
            <span class="sr-only">{{ copied() ? 'Copied' : 'Copy' }}</span>
          </button>
        </div>
      </header>
      <div #container class="monaco-host" [style.height.px]="height()"></div>
      @if (!ready()) {
        <pre tabindex="0"><code>{{ displayedValue() }}</code></pre>
      }
    </section>
  `,
  styles: `
    :host {
      display: block;
      margin-block: 1rem;
    }
    .editor-shell {
      background: var(--aevko-code-background, #fafafa);
      border: 1px solid var(--aevko-border, #c7c7c7);
      color: var(--aevko-foreground, #111111);
      overflow: hidden;
    }
    header {
      align-items: center;
      border-bottom: 1px solid var(--aevko-border, #c7c7c7);
      display: flex;
      font: 500 0.75rem/1 var(--aevko-font-sans, sans-serif);
      justify-content: space-between;
      min-height: 2.75rem;
      padding: 0.35rem 0.625rem;
    }
    .editor-meta {
      align-items: center;
      display: inline-flex;
      min-width: 1.75rem;
    }
    .editor-actions,
    .package-managers {
      align-items: center;
      display: flex;
      gap: 0.25rem;
    }
    header button {
      background: transparent;
      border: 1px solid transparent;
      border-radius: 0;
      color: inherit;
      cursor: pointer;
      font: inherit;
      padding: 0.4rem 0.55rem;
    }
    header button:hover {
      background: color-mix(in srgb, var(--aevko-foreground, #111111) 8%, transparent);
    }
    header button.active {
      background: var(--aevko-background, #ffffff);
      border-color: var(--aevko-border, #c7c7c7);
      color: var(--aevko-foreground, #111111);
    }
    header button:focus-visible {
      outline: 2px solid var(--aevko-focus, #a1a1aa);
      outline-offset: 1px;
    }
    header .copy {
      align-items: center;
      display: inline-flex;
      justify-content: center;
      min-height: 2rem;
      min-width: 2rem;
      padding: 0.35rem;
    }
    .editor-icon {
      height: 0.95rem;
      stroke-width: 1.75;
      width: 0.95rem;
    }
    .monaco-host {
      min-height: 3.5rem;
      width: 100%;
    }
    pre {
      margin: 0;
      overflow: auto;
      padding: 1rem;
      white-space: pre;
    }
    code {
      font-family: 'Cascadia Code', 'SFMono-Regular', Consolas, monospace;
      font-size: 0.875rem;
    }
    .sr-only {
      clip: rect(0, 0, 0, 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }
    :host(.ready) pre {
      display: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.ready]': 'ready()' },
})
export class CodeEditor {
  private readonly destroyRef = inject(DestroyRef);
  private readonly container = viewChild.required<ElementRef<HTMLElement>>('container');
  private editor?: MonacoEditor;
  private monaco?: typeof MonacoApi;
  private themeObserver?: MutationObserver;
  private resizeObserver?: ResizeObserver;
  private copyReset?: ReturnType<typeof setTimeout>;

  readonly value = input.required<string>();
  readonly packageCommand = input<string>();
  readonly language = input<'html' | 'typescript' | 'css' | 'json' | 'shell'>('html');
  readonly filename = input('example.html');
  readonly label = input('Read-only code example');
  protected readonly ready = signal(false);
  protected readonly copied = signal(false);
  protected readonly activeManager = signal<PackageManager>('npm');
  protected readonly managers = packageManagers;
  protected readonly displayedValue = computed(() => {
    const command = this.packageCommand();
    if (command) {
      const executors: Record<PackageManager, string> = {
        npm: 'npx aevko-ui@latest',
        pnpm: 'pnpm dlx aevko-ui@latest',
        yarn: 'yarn dlx aevko-ui@latest',
        bun: 'bunx aevko-ui@latest',
      };
      return `${executors[this.activeManager()]} ${command}`;
    }
    return this.language() === 'html' ? formatHtml(this.value()) : this.value();
  });
  protected readonly height = signal(96);
  protected readonly languageLabel = () =>
    this.language() === 'shell' ? 'Terminal' : this.language();

  constructor() {
    effect(() => {
      const value = this.displayedValue();
      const minimum = this.packageCommand() ? 56 : 88;
      this.height.set(Math.min(420, Math.max(minimum, value.split('\n').length * 20 + 28)));
      if (this.editor?.getValue() !== value) this.editor?.setValue(value);
    });
    afterNextRender(async () => {
      this.monaco = await loadMonaco();
      this.defineThemes(this.monaco);
      this.editor = this.monaco.editor.create(this.container().nativeElement, {
        value: this.displayedValue(),
        language: this.language(),
        theme: this.currentTheme(),
        readOnly: true,
        domReadOnly: true,
        automaticLayout: false,
        minimap: { enabled: false },
        lineNumbers: this.packageCommand() || this.language() === 'shell' ? 'off' : 'on',
        folding: false,
        bracketPairColorization: { enabled: false },
        glyphMargin: false,
        lineDecorationsWidth: this.packageCommand() || this.language() === 'shell' ? 16 : 8,
        lineNumbersMinChars: this.packageCommand() || this.language() === 'shell' ? 1 : 3,
        overviewRulerLanes: 0,
        renderLineHighlight: 'none',
        scrollBeyondLastLine: false,
        scrollbar: { alwaysConsumeMouseWheel: false },
        wordWrap: 'on',
        ariaLabel: this.label(),
        fontFamily: '"Cascadia Code", "SFMono-Regular", Consolas, monospace',
        fontSize: 14,
        padding: { top: 12, bottom: 12 },
      });
      this.resizeObserver = new ResizeObserver(() => this.editor?.layout());
      this.resizeObserver.observe(this.container().nativeElement);
      this.themeObserver = new MutationObserver(() =>
        this.monaco?.editor.setTheme(this.currentTheme()),
      );
      this.themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
      this.ready.set(true);
    });
    this.destroyRef.onDestroy(() => {
      this.editor?.dispose();
      this.resizeObserver?.disconnect();
      this.themeObserver?.disconnect();
      if (this.copyReset) clearTimeout(this.copyReset);
    });
  }

  protected copyLabel(): string {
    return this.copied() ? 'Code copied' : 'Copy code';
  }

  protected async copy(): Promise<void> {
    await navigator.clipboard.writeText(this.displayedValue());
    this.copied.set(true);
    if (this.copyReset) clearTimeout(this.copyReset);
    this.copyReset = setTimeout(() => this.copied.set(false), 1600);
  }

  private currentTheme(): string {
    return document.documentElement.dataset['theme'] === 'dark' ? 'aevko-dark' : 'aevko-light';
  }
  private defineThemes(monaco: typeof MonacoApi): void {
    monaco.editor.defineTheme('aevko-dark', {
      base: 'vs-dark',
      inherit: false,
      rules: [
        { token: '', foreground: 'FFFFFF' },
        { token: 'comment', foreground: 'A8A8A8' },
        { token: 'keyword', foreground: 'FFFFFF', fontStyle: 'bold' },
        { token: 'string', foreground: 'D0D0D0' },
        { token: 'number', foreground: 'B8B8B8' },
        { token: 'tag', foreground: 'FFFFFF', fontStyle: 'bold' },
        { token: 'attribute.name', foreground: 'D0D0D0' },
        { token: 'attribute.value', foreground: 'B8B8B8' },
      ],
      colors: {
        'editor.background': '#18181B',
        'editor.foreground': '#FAFAFA',
        'editorLineNumber.foreground': '#71717A',
        'editorLineNumber.activeForeground': '#D4D4D8',
      },
    });
    monaco.editor.defineTheme('aevko-light', {
      base: 'vs',
      inherit: false,
      rules: [
        { token: '', foreground: '111111' },
        { token: 'comment', foreground: '5F5F5F' },
        { token: 'keyword', foreground: '111111', fontStyle: 'bold' },
        { token: 'string', foreground: '3F3F3F' },
        { token: 'number', foreground: '505050' },
        { token: 'tag', foreground: '111111', fontStyle: 'bold' },
        { token: 'attribute.name', foreground: '3F3F3F' },
        { token: 'attribute.value', foreground: '505050' },
      ],
      colors: {
        'editor.background': '#FAFAFA',
        'editor.foreground': '#18181B',
        'editorLineNumber.foreground': '#71717A',
        'editorLineNumber.activeForeground': '#3F3F46',
      },
    });
  }
}

declare global {
  interface Window {
    monaco: typeof MonacoApi;
    MonacoEnvironment: { getWorkerUrl: (_moduleId: string, _label: string) => string };
    require: {
      (dependencies: string[], callback: () => void): void;
      config(options: { paths: Record<string, string> }): void;
    };
  }
}
