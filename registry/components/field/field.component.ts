import { ChangeDetectionStrategy, Component, booleanAttribute, input } from '@angular/core';

@Component({
  selector: '[aevkoFieldLabel]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './field-label.directive.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoFieldLabel {}
@Component({
  selector: '[aevkoFieldDescription]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './field-description.directive.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoFieldDescription {}
@Component({
  selector: '[aevkoFieldError]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './field-error.directive.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-live': 'polite' },
})
export class AevkoFieldError {}

@Component({
  selector: 'aevko-field',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-invalid]': 'invalid() ? "true" : null' },
})
export class AevkoField {
  readonly invalid = input(false, { transform: booleanAttribute });
}
