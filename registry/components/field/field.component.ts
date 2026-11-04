import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: '[aevkoFieldLabel]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './field-label.directive.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'field-label' },
})
export class AevkoFieldLabel {}
@Component({
  selector: '[aevkoFieldDescription]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './field-description.directive.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'field-description' },
})
export class AevkoFieldDescription {}
@Component({
  selector: '[aevkoFieldError]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './field-error.directive.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-live': 'polite', 'data-slot': 'field-error' },
})
export class AevkoFieldError {}

@Component({
  selector: 'aevko-field-content, [aevkoFieldContent]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './field-content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'field-content' },
})
export class AevkoFieldContent {}

@Component({
  selector: 'aevko-field-group, [aevkoFieldGroup]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './field-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'field-group' },
})
export class AevkoFieldGroup {}

@Component({
  selector: 'aevko-field',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    'data-slot': 'field',
    '[attr.data-invalid]': 'invalid() ? "true" : null',
    '[attr.data-orientation]': 'orientation()',
  },
})
export class AevkoField {
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly orientation = input<'vertical' | 'horizontal' | 'responsive'>('vertical');
}
