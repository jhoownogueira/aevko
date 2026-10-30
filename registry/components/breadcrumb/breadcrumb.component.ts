import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'aevko-breadcrumb',
  standalone: true,
  template: '<div role="list"><ng-content /></div>',
  styleUrl: './breadcrumb.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'navigation', '[attr.aria-label]': 'label()' },
})
export class AevkoBreadcrumb {
  readonly label = input('Breadcrumb');
}

@Component({
  selector: 'aevko-breadcrumb-item',
  standalone: true,
  template:
    '<div class="item"><ng-content />@if (!current()) { <span class="separator" aria-hidden="true"><span class="fallback">{{ separator() }}</span><ng-content select="[aevkoBreadcrumbSeparator]" /></span> }</div>',
  styleUrl: './breadcrumb-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'listitem', '[attr.aria-current]': 'current() ? "page" : null' },
})
export class AevkoBreadcrumbItem {
  readonly current = input(false, { transform: booleanAttribute });
  readonly separator = input('/');
}
