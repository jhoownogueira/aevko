import { ChangeDetectionStrategy, Component, booleanAttribute, input, model } from '@angular/core';

export type AevkoToggleVariant = 'default' | 'outline';
export type AevkoToggleSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'button[aevkoToggle]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './toggle.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    '[attr.aria-pressed]': 'pressed()',
    '[attr.data-state]': 'pressed() ? "on" : "off"',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[disabled]': 'disabled()',
    '(click)': 'toggle()',
  },
})
export class AevkoToggle {
  readonly pressed = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly variant = input<AevkoToggleVariant>('default');
  readonly size = input<AevkoToggleSize>('md');

  protected toggle(): void {
    if (!this.disabled()) this.pressed.update((value) => !value);
  }
}
