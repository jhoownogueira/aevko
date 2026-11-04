import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
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
import { ManualInstallation } from './manual-installation';
import { COMPONENTS } from './component-catalog';

const searchablePages = [
  { title: 'Installation', path: '/getting-started', eyebrow: 'Documentation' },
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
    ManualInstallation,
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
  host: {
    '(document:keydown)': 'handleShortcut($event)',
    '(document:click)': 'handleAnchor($event)',
  },
})
export class App {
  private readonly destroyRef = inject(DestroyRef);
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
  protected readonly componentGroups = [
    { label: 'Layout', items: COMPONENTS.slice(0, 12) },
    { label: 'Actions and navigation', items: COMPONENTS.slice(12, 21) },
    { label: 'Forms', items: COMPONENTS.slice(21, 38) },
    { label: 'Feedback and overlays', items: COMPONENTS.slice(38, 50) },
    { label: 'Content and data', items: COMPONENTS.slice(50) },
  ];
  protected readonly embedded = computed(() => this.url().startsWith('/blocks/preview/'));
  protected readonly showSidebar = computed(() => {
    const path = this.url().split('?')[0] ?? '/';
    return (
      !['/', '/components', '/layout-showcase', '/charts', '/themes', '/typeset'].includes(path) &&
      !path.startsWith('/blocks')
    );
  });
  protected readonly menuOpen = signal(false);
  protected readonly blockSourceOpen = signal(false);
  protected readonly blockSlug = computed(() => {
    const match = this.url()
      .split('?')[0]
      ?.match(/^\/blocks\/([^/]+)$/);
    return match?.[1] ?? '';
  });
  protected readonly query = signal('');
  protected readonly searchOpen = signal(false);
  protected readonly dark = signal(false);

  private searchWasOpen = false;
  private returnFocus: HTMLElement | null = null;
  constructor() {
    afterNextRender(() => {
      let theme = 'light';
      try {
        theme = localStorage.getItem('aevko-theme') ?? 'light';
      } catch {
        /* Storage may be unavailable. */
      }
      this.dark.set(theme === 'dark');
      this.document.documentElement.dataset['theme'] = theme;
      const observer = new MutationObserver(() => {
        this.dark.set(this.document.documentElement.dataset['theme'] === 'dark');
      });
      observer.observe(this.document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
    afterRenderEffect(() => {
      const open = this.searchOpen();
      if (open && !this.searchWasOpen) {
        this.returnFocus = this.document.activeElement as HTMLElement;
        this.document.querySelector<HTMLInputElement>('#docs-search')?.focus();
      } else if (!open && this.searchWasOpen) this.returnFocus?.focus();
      this.searchWasOpen = open;
    });
  }

  protected handleAnchor(event: MouseEvent): void {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    const fragment = anchor?.getAttribute('href')?.slice(1);
    if (!fragment) return;
    const target = this.document.getElementById(decodeURIComponent(fragment));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ block: 'start' });
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }

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
    if (event.key === 'Tab' && this.searchOpen()) {
      const items = Array.from(
        this.document.querySelectorAll<HTMLElement>(
          '.search-panel button, .search-panel a, .search-panel input',
        ),
      );
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && this.document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && this.document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    if (event.key === 'Escape') {
      this.searchOpen.set(false);
      this.menuOpen.set(false);
    }
  }

  protected toggleTheme(): void {
    this.dark.set(this.document.documentElement.dataset['theme'] !== 'dark');
    if (!isPlatformBrowser(this.platformId)) return;
    for (const token of ['background', 'foreground', 'surface', 'border'])
      this.document.documentElement.style.removeProperty('--aevko-' + token);
    const theme = this.dark() ? 'dark' : 'light';
    this.document.documentElement.dataset['theme'] = theme;
    try {
      localStorage.setItem('aevko-theme', theme);
    } catch {
      /* Theme still works without storage. */
    }
  }

  protected componentPath(name: string): string {
    return `/components/${name.toLocaleLowerCase().replaceAll(' ', '-')}`;
  }
}
