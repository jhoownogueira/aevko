import { ViewEncapsulation, ChangeDetectionStrategy, Component, input } from '@angular/core';
@Component({
  selector: 'aevko-navigation-menu',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './navigation-menu.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'navigation', 'data-slot': 'navigation-menu', '[attr.aria-label]': 'label()' },
})
export class AevkoNavigationMenu {
  readonly label = input.required<string>();
}
