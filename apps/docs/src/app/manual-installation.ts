import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { CodeEditor } from './code-editor';
interface SourceFile {
  target: string;
  content: string;
}
interface RegistrySource {
  files: SourceFile[];
  registryDependencies: string[];
  npmDependencies: Record<string, string>;
}
@Component({
  selector: 'aevko-manual-installation',
  standalone: true,
  imports: [CodeEditor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>
      Copy the source files below into <code>src/app/ui</code>, preserving their relative paths.
      These are the same files installed by the CLI, including component dependencies.
    </p>
    <p>
      First, follow the <a href="/getting-started">project setup</a> to configure the shared theme.
      Then copy the files and import the component from its local directory.
    </p>
    @if (loading()) {
      <p role="status">Loading component source…</p>
    }
    @if (error()) {
      <p role="alert">{{ error() }}</p>
      <button type="button" (click)="retry.update((value) => value + 1)">
        Retry loading source
      </button>
    }
    @if (installCommand()) {
      <h3>Install dependencies</h3>
      <aevko-code-editor
        [value]="installCommand()"
        language="shell"
        filename="Terminal"
        label="Required npm dependencies"
      />
    }
    @for (file of files(); track file.target; let index = $index) {
      <section>
        <h3>
          {{ index + 1 }}. Create <code>src/app/ui/{{ file.target }}</code>
        </h3>
        <details>
          <summary>Show source · {{ file.target }}</summary>
          <aevko-code-editor
            [value]="file.content"
            [language]="language(file.target)"
            [filename]="file.target"
            [label]="'Source for ' + file.target"
          />
        </details>
      </section>
    }
  `,
  styles: `
    :host {
      display: block;
    }
    p {
      color: var(--aevko-muted);
      font-size: 0.875rem;
      line-height: 1.7;
    }
    a {
      color: var(--aevko-foreground);
      text-underline-offset: 3px;
    }
    section {
      margin-block: 1.5rem;
      min-width: 0;
    }
    h3 {
      font-size: 0.875rem;
      font-weight: 600;
      overflow-wrap: anywhere;
    }
    details {
      border: 1px solid var(--aevko-border);
    }
    summary {
      cursor: pointer;
      padding: 1rem;
      font-size: 0.875rem;
      overflow-wrap: anywhere;
    }
    summary:focus-visible {
      outline: 2px solid var(--aevko-focus);
    }
  `,
})
export class ManualInstallation {
  readonly kind = input<'components' | 'blocks'>('components');
  readonly slug = input.required<string>();
  protected readonly files = signal<SourceFile[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly installCommand = signal('');
  protected readonly retry = signal(0);
  constructor() {
    afterRenderEffect((onCleanup) => {
      const slug = this.slug();
      const kind = this.kind();
      this.retry();
      const controller = new AbortController();
      onCleanup(() => controller.abort());
      this.loading.set(true);
      this.error.set('');
      this.files.set([]);
      this.installCommand.set('');
      const visited = new Set<string>();
      const files = new Map<string, SourceFile>();
      const dependencies: Record<string, string> = {};
      const load = async (
        name: string,
        directory: 'components' | 'blocks' = 'components',
      ): Promise<void> => {
        if (visited.has(name)) return;
        if (!/^[a-z0-9-]+$/.test(name)) throw new Error('Invalid component name.');
        visited.add(name);
        const response = await fetch(
          new URL(`registry/${directory}/${name}.json`, document.baseURI),
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error('Component source could not be loaded. Please retry.');
        const item = (await response.json()) as RegistrySource;
        for (const dependency of item.registryDependencies) await load(dependency);
        for (const file of item.files) files.set(file.target, file);
        Object.assign(dependencies, item.npmDependencies);
      };
      void load(slug, kind)
        .then(() => {
          if (controller.signal.aborted) return;
          this.files.set([...files.values()]);
          const packages = Object.entries(dependencies).map(
            ([name, version]) => `${name}@${version}`,
          );
          this.installCommand.set(packages.length ? `npm install ${packages.join(' ')}` : '');
        })
        .catch((error) => {
          if (!controller.signal.aborted)
            this.error.set(error instanceof Error ? error.message : 'Unable to load source.');
        })
        .finally(() => {
          if (!controller.signal.aborted) this.loading.set(false);
        });
    });
  }
  protected language(path: string): 'typescript' | 'html' | 'css' | 'json' {
    return path.endsWith('.ts')
      ? 'typescript'
      : path.endsWith('.html')
        ? 'html'
        : path.endsWith('.css')
          ? 'css'
          : 'json';
  }
}
