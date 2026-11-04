import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AevkoAccordion } from '../../../../registry/components/accordion';
import { AevkoCard } from '../../../../registry/components/card';
import { CodeEditor } from './code-editor';

const items = [
  {
    id: 'account',
    label: 'How do I update my account?',
    content:
      'Open your workspace settings to update your profile, email address, and sign-in preferences. Your changes apply to every project in the workspace.',
  },
  {
    id: 'team',
    label: 'Can I invite my team?',
    content:
      'Invite collaborators from the Members page. Choose a role for each person so they have access to the projects and settings they need.',
  },
  {
    id: 'billing',
    label: 'Where can I find my invoices?',
    content:
      'Visit Billing to download past invoices, review your current plan, and update the payment method used for your next billing cycle.',
  },
];

@Component({
  selector: 'aevko-accordion-examples',
  standalone: true,
  imports: [AevkoAccordion, AevkoCard, CodeEditor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2>Examples</h2>
    @for (example of examples; track example.id) {
      <section [attr.aria-labelledby]="'example-' + example.id">
        <h3 [id]="'example-' + example.id">{{ example.title }}</h3>
        <p class="description">{{ example.description }}</p>
        <div class="example-shell">
          <div class="example-preview">
            @if (example.id === 'card') {
              <aevko-card>
                <div>
                  <h4>Workspace &amp; billing</h4>
                  <p class="description">Answers to common account questions.</p>
                </div>
                <aevko-accordion
                  [id]="'accordion-example-' + example.id"
                  [label]="example.title"
                  [items]="example.items"
                  [value]="['account']"
                />
              </aevko-card>
            } @else {
              <aevko-accordion
                [id]="'accordion-example-' + example.id"
                [label]="example.title"
                [items]="example.items"
                [type]="example.multiple ? 'multiple' : 'single'"
                [value]="['account']"
                [class.bordered]="example.id === 'bordered'"
              />
            }
          </div>
          <button
            type="button"
            class="code-toggle"
            [attr.aria-expanded]="expanded().includes(example.id)"
            [attr.aria-controls]="'example-code-' + example.id"
            (click)="toggle(example.id)"
          >
            {{ expanded().includes(example.id) ? 'Hide code' : 'View code' }}
          </button>
          @if (expanded().includes(example.id)) {
            <div [id]="'example-code-' + example.id">
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
    h4 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
    }
    section {
      margin-block: 2.5rem;
    }
    .description {
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
      display: grid;
      justify-items: center;
      min-width: 0;
    }
    .example-preview > * {
      width: 100%;
      max-width: 30rem;
      min-width: 0;
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
  `,
})
export class AccordionExamples {
  protected readonly expanded = signal<string[]>([]);
  protected readonly examples = [
    {
      id: 'basic',
      title: 'Default open',
      description:
        'Start with the first answer expanded. Opening another answer closes the previous one.',
    },
    {
      id: 'multiple',
      title: 'Multiple sections',
      description:
        'Keep several answers open at once. Each section can be expanded or collapsed independently.',
    },
    {
      id: 'disabled',
      title: 'Disabled item',
      description:
        'The team section is unavailable. Disabled triggers cannot be activated with a pointer or keyboard.',
    },
    {
      id: 'bordered',
      title: 'Bordered',
      description: 'Add an outer border and inset spacing using the included bordered class.',
    },
    {
      id: 'card',
      title: 'Inside a card',
      description: 'Compose the same accordion with a card header to group related questions.',
    },
  ].map((example) => {
    const data = items.map((item) => ({
      ...item,
      ...(example.id === 'disabled' && item.id === 'team' ? { disabled: true } : {}),
    }));
    const accordion = `<aevko-accordion id="${example.id}-faq" label="${example.title}" [items]="items" [value]="['account']"${example.id === 'multiple' ? ' type="multiple"' : ''}${example.id === 'bordered' ? ' class="bordered"' : ''} />`;
    const template =
      example.id === 'card'
        ? `<aevko-card><div><h2>Workspace &amp; billing</h2><p>Answers to common account questions.</p></div>${accordion}</aevko-card>`
        : accordion;
    return {
      ...example,
      items: data,
      multiple: example.id === 'multiple',
      code: `import { ChangeDetectionStrategy, Component } from '@angular/core';\nimport { AevkoAccordion } from './ui/accordion';\n${example.id === 'card' ? "import { AevkoCard } from './ui/card';\n" : ''}\n@Component({\n  selector: 'app-example',\n  standalone: true,\n  imports: [AevkoAccordion${example.id === 'card' ? ', AevkoCard' : ''}],\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  template: \`${template}\`,\n})\nexport class ExampleComponent {\n  readonly items = ${JSON.stringify(data, null, 2)};\n}\n`,
    };
  });
  protected toggle(id: string): void {
    this.expanded.update((value) =>
      value.includes(id) ? value.filter((item) => item !== id) : [...value, id],
    );
  }
}
