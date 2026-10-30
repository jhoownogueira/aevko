import { ChangeDetectionStrategy, Component, input } from '@angular/core';
@Component({
  selector: 'aevko-navigation-menu',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './navigation-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'navigation', '[attr.aria-label]': 'label()' },
})
export class AevkoNavigationMenu {
  readonly label = input.required<string>();
}
