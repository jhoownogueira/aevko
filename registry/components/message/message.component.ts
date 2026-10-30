import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'aevko-message',
  standalone: true,
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-variant]': 'variant()', '[attr.data-align]': 'align()' },
})
export class AevkoMessage {
  readonly variant = input<'default' | 'muted' | 'danger'>('default');
  readonly align = input<'start' | 'end'>('start');
}
