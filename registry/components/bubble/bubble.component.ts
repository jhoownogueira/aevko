import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'aevko-bubble',
  standalone: true,
  template:
    '<div class="content"><ng-content /></div><div class="reactions"><ng-content select="[aevkoBubbleReactions]" /></div>',
  styleUrl: './bubble.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-align]': 'align()', '[attr.data-variant]': 'variant()' },
})
export class AevkoBubble {
  readonly align = input<'start' | 'end'>('start');
  readonly variant = input<'default' | 'muted' | 'outline'>('default');
}
