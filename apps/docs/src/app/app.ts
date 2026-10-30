import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  LucideArrowRight,
  LucideMenu,
  LucideMoon,
  LucideSearch,
  LucideSun,
  LucideX,
} from '@lucide/angular';
import { filter, map } from 'rxjs';
import { COMPONENTS } from './pages';

const searchablePages = [
  { title: 'Introduction', path: '/', eyebrow: 'Documentation' },
  { title: 'Installation', path: '/getting-started', eyebrow: 'Documentation' },
  { title: 'Components', path: '/components', eyebrow: 'Catalog' },
  { title: 'Button', path: '/components/button', eyebrow: 'Component' },
  { title: 'Card', path: '/components/card', eyebrow: 'Component' },
  { title: 'Separator', path: '/components/separator', eyebrow: 'Component' },
  { title: 'Theming', path: '/theming', eyebrow: 'Documentation' },
  { title: 'Icons', path: '/icons', eyebrow: 'Documentation' },
  { title: 'CLI and Registry', path: '/cli', eyebrow: 'Documentation' },
  ...COMPONENTS.map((title) => ({
    title,
    path: `/components/${title.toLocaleLowerCase().replaceAll(' ', '-')}`,
    eyebrow: 'Component',
  })),
];

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LucideArrowRight,
    LucideMenu,
    LucideMoon,
    LucideSearch,
    LucideSun,
    LucideX,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'handleShortcut($event)' },
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );
  protected readonly components = COMPONENTS;
  protected readonly showSidebar = computed(
    () => !['/', '/components', '/layout-showcase'].includes(this.url().split('?')[0] ?? '/'),
  );
  protected readonly menuOpen = signal(false);
  protected readonly query = signal('');
  protected readonly searchOpen = signal(false);
  protected readonly dark = signal(false);

  protected results() {
    const query = this.query().trim().toLocaleLowerCase();
    if (!query) return searchablePages;
    return searchablePages.filter((page) =>
      `${page.eyebrow} ${page.title}`.toLocaleLowerCase().includes(query),
    );
  }

  protected handleShortcut(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === 'k') {
      event.preventDefault();
      this.searchOpen.set(true);
      queueMicrotask(() => this.document.querySelector<HTMLInputElement>('#docs-search')?.focus());
    }
    if (event.key === 'Escape') {
      this.searchOpen.set(false);
      this.menuOpen.set(false);
    }
  }

  protected toggleTheme(): void {
    this.dark.update((value) => !value);
    if (!isPlatformBrowser(this.platformId)) return;
    const theme = this.dark() ? 'dark' : 'light';
    this.document.documentElement.dataset['theme'] = theme;
    localStorage.setItem('aevko-theme', theme);
  }

  protected componentPath(name: string): string {
    return `/components/${name.toLocaleLowerCase().replaceAll(' ', '-')}`;
  }
}
