import {
  ElementRef,
  inject,
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input,
  model,
} from '@angular/core';

@Component({
  selector: 'aevko-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar',
    '[attr.data-collapsed]': 'collapsed()',
    '(document:keydown.escape)': 'close()',
    '(document:focusin)': 'dismissOutside($event)',
  },
})
export class AevkoSidebar {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly id = input('aevko-sidebar-panel');
  readonly label = input('Primary navigation');
  readonly open = model(false);
  readonly collapsed = model(false);
  readonly closeOnNavigate = input(true, { transform: booleanAttribute });
  protected dismissOutside(event: Event): void {
    if (this.open() && !event.composedPath().includes(this.element.nativeElement))
      this.open.set(false);
  }
  protected navigate(event: MouseEvent): void {
    if (this.closeOnNavigate() && (event.target as Element).closest('a[href]')) this.close();
  }
  protected close(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.element.nativeElement.querySelector<HTMLButtonElement>('.mobile-trigger')?.focus();
  }
}
