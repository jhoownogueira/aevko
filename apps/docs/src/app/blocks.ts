import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { BlockPreview } from './block-preview';

export const BLOCKS = [
  {
    family: 'Dashboard',
    name: 'dashboard-01',
    title: 'Operations dashboard',
    description: 'Metrics, chart, activity and a native project table.',
  },
  {
    family: 'Authentication',
    name: 'login-01',
    title: 'Sign in 01',
    description: 'A responsive sign-in composition with native form behavior.',
  },
  {
    family: 'Authentication',
    name: 'login-02',
    title: 'Sign in 02',
    description: 'A responsive sign-in composition with native form behavior.',
  },
  {
    family: 'Authentication',
    name: 'login-03',
    title: 'Sign in 03',
    description: 'A responsive sign-in composition with native form behavior.',
  },
  {
    family: 'Authentication',
    name: 'login-04',
    title: 'Sign in 04',
    description: 'A responsive sign-in composition with native form behavior.',
  },
  {
    family: 'Authentication',
    name: 'login-05',
    title: 'Sign in 05',
    description: 'A responsive sign-in composition with native form behavior.',
  },
  {
    family: 'Authentication',
    name: 'signup-01',
    title: 'Sign up 01',
    description: 'An editable account-creation composition.',
  },
  {
    family: 'Authentication',
    name: 'signup-02',
    title: 'Sign up 02',
    description: 'An editable account-creation composition.',
  },
  {
    family: 'Authentication',
    name: 'signup-03',
    title: 'Sign up 03',
    description: 'An editable account-creation composition.',
  },
  {
    family: 'Authentication',
    name: 'signup-04',
    title: 'Sign up 04',
    description: 'An editable account-creation composition.',
  },
  {
    family: 'Authentication',
    name: 'signup-05',
    title: 'Sign up 05',
    description: 'An editable account-creation composition.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-01',
    title: 'Sidebar 01',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-02',
    title: 'Sidebar 02',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-03',
    title: 'Sidebar 03',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-04',
    title: 'Sidebar 04',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-05',
    title: 'Sidebar 05',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-06',
    title: 'Sidebar 06',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-07',
    title: 'Sidebar 07',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-08',
    title: 'Sidebar 08',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-09',
    title: 'Sidebar 09',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-10',
    title: 'Sidebar 10',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-11',
    title: 'Sidebar 11',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-12',
    title: 'Sidebar 12',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-13',
    title: 'Sidebar 13',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-14',
    title: 'Sidebar 14',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-15',
    title: 'Sidebar 15',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
  {
    family: 'Sidebar',
    name: 'sidebar-16',
    title: 'Sidebar 16',
    description: 'A responsive application shell with canonical Aevko navigation.',
  },
] as const;

@Component({
  selector: 'aevko-blocks-page',
  standalone: true,
  imports: [BlockPreview],
  template: ` <section class="blocks-hero">
      <p class="eyebrow">27 editable compositions</p>
      <h1>Build the next screen.</h1>
      <p class="lede">
        Complete Angular layouts with real interactions. Explore a live preview, check it at
        different widths, and copy the source into your project.
      </p>
    </section>
    <section class="blocks-catalog" aria-label="Block catalog">
      <nav class="block-filters" aria-label="Block category">
        @for (family of filters; track family) {
          <button
            type="button"
            [attr.aria-pressed]="selected() === family"
            (click)="selected.set(family)"
          >
            {{ family }}
          </button>
        }
      </nav>
      <p class="results" role="status">
        {{ visible().length }} {{ visible().length === 1 ? 'composition' : 'compositions' }}
      </p>
      <div class="block-list">
        @for (block of visible(); track block.name) {
          <aevko-block-preview
            [slug]="block.name"
            [title]="block.title"
            [description]="block.description"
          />
        }
      </div>
    </section>`,
  styleUrl: './blocks.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlocksPage {
  protected readonly filters = ['Featured', 'Dashboard', 'Authentication', 'Sidebar', 'All'];
  protected readonly selected = signal('Featured');
  protected readonly visible = computed(() =>
    BLOCKS.filter(
      (block) =>
        this.selected() === 'All' ||
        (this.selected() === 'Featured'
          ? ['dashboard-01', 'sidebar-07', 'login-03', 'signup-03'].includes(block.name)
          : block.family === this.selected()),
    ),
  );
}
