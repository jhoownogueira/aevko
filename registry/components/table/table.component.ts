import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'div[aevkoTableContainer]',
  standalone: true,
  template: '<ng-content />',
  styles: `
    :host {
      display: block;
      max-width: 100%;
      overflow-x: auto;
      position: relative;
      width: 100%;
    }
    :host(:focus-visible) {
      outline: 2px solid var(--aevko-focus, #a1a1aa);
      outline-offset: 1px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'region',
    tabindex: '0',
    '[attr.aria-label]': 'label()',
  },
})
export class AevkoTableContainer {
  readonly label = input('Scrollable table');
}

@Component({
  selector: 'table[aevkoTable]',
  standalone: true,
  template: '<ng-content />',
  styles: `
    :host {
      border-collapse: collapse;
      caption-side: bottom;
      width: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoTable {}

@Component({
  selector: 'thead[aevkoTableHeader]',
  standalone: true,
  template: '<ng-content />',
  styles: `
    :host {
      background: color-mix(in srgb, var(--aevko-surface, #f4f4f5) 72%, transparent);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoTableHeader {}

@Component({
  selector: 'tbody[aevkoTableBody]',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoTableBody {}

@Component({
  selector: 'tfoot[aevkoTableFooter]',
  standalone: true,
  template: '<ng-content />',
  styles: `
    :host {
      background: var(--aevko-surface, #f4f4f5);
      font-weight: 650;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoTableFooter {}

@Component({
  selector: 'tr[aevkoTableRow]',
  standalone: true,
  template: '<ng-content />',
  styles: `
    :host {
      border-bottom: 1px solid var(--aevko-border, #e4e4e7);
      transition: background-color 120ms ease;
    }
    :host(:hover) {
      background: color-mix(in srgb, var(--aevko-surface, #f4f4f5) 52%, transparent);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoTableRow {}

@Component({
  selector: 'th[aevkoTableHead]',
  standalone: true,
  template: '<ng-content />',
  styles: `
    :host {
      color: var(--aevko-foreground, #09090b);
      font-weight: 650;
      height: 2.75rem;
      padding: 0.75rem;
      text-align: left;
      vertical-align: middle;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoTableHead {}

@Component({
  selector: 'td[aevkoTableCell]',
  standalone: true,
  template: '<ng-content />',
  styles: `
    :host {
      padding: 0.75rem;
      vertical-align: middle;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoTableCell {}

@Component({
  selector: 'caption[aevkoTableCaption]',
  standalone: true,
  template: '<ng-content />',
  styles: `
    :host {
      color: var(--aevko-muted, #71717a);
      font-size: 0.875rem;
      margin-top: 0.9rem;
      text-align: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoTableCaption {}
