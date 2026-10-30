import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideFolderOpen,
  LucideMenu,
  LucidePackageOpen,
} from '@lucide/angular';
import { AevkoAccordion, AevkoAccordionItem } from '../../../../registry/components/accordion';
import { AevkoAspectRatio } from '../../../../registry/components/aspect-ratio';
import { AevkoCarousel, AevkoCarouselSlide } from '../../../../registry/components/carousel';
import { AevkoCollapsible } from '../../../../registry/components/collapsible';
import { AevkoDirection } from '../../../../registry/components/direction';
import { AevkoEmpty } from '../../../../registry/components/empty';
import { AevkoItem } from '../../../../registry/components/item';
import { AevkoResizable } from '../../../../registry/components/resizable';
import { AevkoScrollArea } from '../../../../registry/components/scroll-area';
import { AevkoSidebar } from '../../../../registry/components/sidebar';

@Component({
  standalone: true,
  imports: [
    AevkoAccordion,
    AevkoAspectRatio,
    AevkoCarousel,
    AevkoCarouselSlide,
    AevkoCollapsible,
    AevkoDirection,
    AevkoEmpty,
    AevkoItem,
    AevkoResizable,
    AevkoScrollArea,
    AevkoSidebar,
    LucideChevronLeft,
    LucideChevronRight,
    LucideFolderOpen,
    LucideMenu,
    LucidePackageOpen,
  ],
  template: `
    <article class="showcase">
      <p class="eyebrow">Phase 1 / Canonical source</p>
      <h1>Layout primitives</h1>
      <section>
        <h2>Accordion</h2>
        <aevko-accordion [items]="accordionItems" />
      </section>
      <section>
        <h2>Aspect Ratio</h2>
        <aevko-aspect-ratio ratio="16/9"><div class="media">16 / 9</div></aevko-aspect-ratio>
      </section>
      <section>
        <h2>Carousel</h2>
        <aevko-carousel label="Featured work"
          ><svg
            lucideChevronLeft
            aevkoCarouselPreviousIcon
            class="docs-icon"
            aria-hidden="true"
          ></svg
          ><svg lucideChevronRight aevkoCarouselNextIcon class="docs-icon" aria-hidden="true"></svg
          ><aevko-carousel-slide label="Slide 1 of 2"
            ><div class="slide">Source-first</div></aevko-carousel-slide
          ><aevko-carousel-slide label="Slide 2 of 2"
            ><div class="slide accent">Accessible</div></aevko-carousel-slide
          ></aevko-carousel
        >
      </section>
      <section>
        <h2>Collapsible</h2>
        <aevko-collapsible label="Project details"
          ><svg lucideChevronRight aevkoCollapsibleIcon class="docs-icon" aria-hidden="true"></svg
          >Editable Angular source with native disclosure semantics.</aevko-collapsible
        >
      </section>
      <section aevkoDirection="rtl">
        <h2>Direction</h2>
        <p>This region uses right-to-left direction.</p>
      </section>
      <section>
        <h2>Empty</h2>
        <aevko-empty
          ><svg lucideFolderOpen aevkoEmptyIcon class="docs-icon" aria-hidden="true"></svg
          ><strong aevkoEmptyTitle>No projects</strong
          ><span aevkoEmptyDescription>Create a project when your team is ready.</span
          ><button aevkoEmptyAction type="button">Create project</button></aevko-empty
        >
      </section>
      <section>
        <h2>Item</h2>
        <aevko-item variant="outline"
          ><svg lucidePackageOpen aevkoItemIcon class="docs-icon" aria-hidden="true"></svg
          ><strong aevkoItemTitle>Design system</strong
          ><span aevkoItemDescription>Updated today</span
          ><button aevkoItemAction type="button">Open</button></aevko-item
        >
      </section>
      <section>
        <h2>Resizable</h2>
        <aevko-resizable
          ><div aevkoResizableFirst class="panel">First panel</div>
          <div aevkoResizableSecond class="panel">Second panel</div></aevko-resizable
        >
      </section>
      <section>
        <h2>Scroll Area</h2>
        <aevko-scroll-area class="scroll"
          ><p>Focusable native scrolling.</p>
          <p>Keyboard and touch continue to use platform behavior.</p>
          <p>No synthetic scroll implementation.</p></aevko-scroll-area
        >
      </section>
      <section>
        <h2>Sidebar</h2>
        <aevko-sidebar
          ><svg lucideMenu aevkoSidebarMenuIcon class="docs-icon" aria-hidden="true"></svg
          ><svg
            lucideChevronLeft
            aevkoSidebarCollapseIcon
            class="docs-icon"
            aria-hidden="true"
          ></svg
          ><svg lucideChevronRight aevkoSidebarExpandIcon class="docs-icon" aria-hidden="true"></svg
          ><strong aevkoSidebarHeader>Aevko</strong><a href="#layout">Layout</a
          ><a href="#tokens">Tokens</a><small aevkoSidebarFooter>Local source</small></aevko-sidebar
        >
      </section>
    </article>
  `,
  styles: `
    .showcase {
      display: grid;
      gap: 4rem;
      margin: auto;
      max-width: 70rem;
      padding: 5rem clamp(1rem, 5vw, 4rem);
    }
    h1 {
      font-size: clamp(3rem, 7vw, 6rem);
      margin: 0;
    }
    h2 {
      font-size: 1.5rem;
    }
    section {
      display: grid;
      gap: 1rem;
    }
    .eyebrow {
      font-size: 0.75rem;
      font-weight: 750;
      letter-spacing: 0.13em;
      text-transform: uppercase;
    }
    .media,
    .slide,
    .panel {
      align-items: center;
      background: var(--aevko-surface);
      display: flex;
      justify-content: center;
      min-height: 12rem;
      padding: 2rem;
    }
    .slide.accent {
      background: var(--aevko-accent);
      color: var(--aevko-accent-foreground);
    }
    .scroll {
      max-height: 6rem;
    }
    aevko-sidebar a {
      color: inherit;
      padding: 0.75rem;
      text-decoration: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutShowcasePage {
  protected readonly accordionItems: readonly AevkoAccordionItem[] = [
    {
      id: 'ownership',
      label: 'Own your code',
      content: 'The installed source belongs to your application.',
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      content: 'Keyboard and semantic behavior are part of the foundation.',
    },
  ];
}
