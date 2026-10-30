import {
  PLATFORM_ID,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  contentChildren,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'aevko-message-scroller-item',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './message-scroller-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-message-id]': 'messageId()',
    '[attr.data-scroll-anchor]': 'scrollAnchor() ? "true" : null',
  },
})
export class AevkoMessageScrollerItem {
  readonly messageId = input.required<string>();
  readonly scrollAnchor = input(false, { transform: booleanAttribute });
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
}

@Component({
  selector: 'aevko-message-scroller',
  standalone: true,
  templateUrl: './message-scroller.component.html',
  styleUrl: './message-scroller.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoMessageScroller {
  readonly label = input('Messages');
  readonly autoScroll = input(false, { transform: booleanAttribute });
  readonly preserveScrollOnPrepend = input(true, { transform: booleanAttribute });
  protected readonly canScrollToEnd = signal(false);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly content = viewChild.required<ElementRef<HTMLElement>>('content');
  private readonly items = contentChildren(AevkoMessageScrollerItem);
  private wasAtEnd = true;
  private lastHeight = 0;
  private firstItem: Element | null = null;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const viewport = this.viewport().nativeElement;
      const content = this.content().nativeElement;
      this.lastHeight = viewport.scrollHeight;
      this.firstItem = content.firstElementChild;
      this.updateScrollState();
      const observer = new MutationObserver(() => this.handleMutation());
      observer.observe(content, { childList: true, characterData: true, subtree: true });
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected updateScrollState(): void {
    const viewport = this.viewport().nativeElement;
    this.wasAtEnd = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight <= 2;
    this.canScrollToEnd.set(!this.wasAtEnd);
  }

  protected scrollToEnd(): void {
    const viewport = this.viewport().nativeElement;
    viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
    this.wasAtEnd = true;
    this.canScrollToEnd.set(false);
  }

  scrollToMessage(messageId: string): boolean {
    const item = this.items().find((candidate) => candidate.messageId() === messageId);
    if (!item) return false;
    item.element.nativeElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    this.wasAtEnd = false;
    return true;
  }

  private handleMutation(): void {
    const viewport = this.viewport().nativeElement;
    const content = this.content().nativeElement;
    const nextHeight = viewport.scrollHeight;
    const firstChanged = this.firstItem !== null && content.firstElementChild !== this.firstItem;
    if (firstChanged && this.preserveScrollOnPrepend()) {
      viewport.scrollTop += nextHeight - this.lastHeight;
    } else if (this.autoScroll() && this.wasAtEnd) {
      viewport.scrollTop = nextHeight;
    }
    this.firstItem = content.firstElementChild;
    this.lastHeight = nextHeight;
    this.updateScrollState();
  }
}
