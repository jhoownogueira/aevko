import { ChangeDetectionStrategy, Component, booleanAttribute, input, model } from '@angular/core';

@Component({
  selector: 'aevko-collapsible',
  standalone: true,
  templateUrl: './collapsible.component.html',
  styleUrl: './collapsible.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoCollapsible {
  readonly label = input.required<string>();
  readonly open = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly panelId = input('aevko-collapsible-panel');

  protected toggle(): void {
    if (!this.disabled()) this.open.update((value) => !value);
  }
}
