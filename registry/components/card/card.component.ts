import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'aevko-card',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoCard {}

@Component({
  selector: 'aevko-card-header',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './card-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoCardHeader {}

@Component({
  selector: 'aevko-card-title',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './card-title.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoCardTitle {}

@Component({
  selector: 'aevko-card-description',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './card-description.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoCardDescription {}

@Component({
  selector: 'aevko-card-content',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './card-content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoCardContent {}

@Component({
  selector: 'aevko-card-footer',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './card-footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoCardFooter {}

@Component({
  selector: 'aevko-card-actions',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './card-actions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoCardActions {}

export const AEVKO_CARD_IMPORTS = [
  AevkoCard,
  AevkoCardHeader,
  AevkoCardTitle,
  AevkoCardDescription,
  AevkoCardContent,
  AevkoCardFooter,
  AevkoCardActions,
] as const;
