import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'aevko-input-group',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './input-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoInputGroup {}

@Component({
  selector: 'aevko-input-group-addon',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './input-group-addon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-align]': 'align()' },
})
export class AevkoInputGroupAddon {
  readonly align = input<'inline-start' | 'inline-end' | 'block-start' | 'block-end'>(
    'inline-start',
  );
}

@Component({
  selector: 'input[aevkoInputGroupControl], textarea[aevkoInputGroupControl]',
  standalone: true,
  template: '',
  styleUrl: './input-group-control.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoInputGroupControl {}

@Component({
  selector: 'button[aevkoInputGroupButton]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './input-group-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { type: 'button' },
})
export class AevkoInputGroupButton {}
