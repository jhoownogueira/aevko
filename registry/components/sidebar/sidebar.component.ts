import { ChangeDetectionStrategy, Component, booleanAttribute, input, model } from '@angular/core';

@Component({
  selector: 'aevko-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'close()' },
})
export class AevkoSidebar {
  readonly label = input('Primary navigation');
  readonly open = model(false);
  readonly collapsed = model(false);
  readonly closeOnNavigate = input(true, { transform: booleanAttribute });
  protected close(): void {
    this.open.set(false);
  }
}
