import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';

@Component({
  selector: 'aevko-input-group',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './input-group.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'group', 'data-slot': 'input-group' },
})
export class AevkoInputGroup {}

@Component({
  selector: 'aevko-input-group-addon',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './input-group-addon.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'group',
    'data-slot': 'input-group-addon',
    '[attr.data-align]': 'align()',
    '(click)': 'focusControl($event)',
  },
})
export class AevkoInputGroupAddon {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly align = input<'inline-start' | 'inline-end' | 'block-start' | 'block-end'>(
    'inline-start',
  );

  protected focusControl(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('button, a')) {
      return;
    }
    this.element.nativeElement.parentElement
      ?.querySelector<HTMLElement>('input, textarea, select')
      ?.focus();
  }
}

@Component({
  selector: 'input[aevkoInputGroupControl], textarea[aevkoInputGroupControl]',
  standalone: true,
  template: '',
  styleUrl: './input-group-control.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'input-group-control' },
})
export class AevkoInputGroupControl {}

@Component({
  selector: 'button[aevkoInputGroupButton]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './input-group-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    'data-slot': 'input-group-button',
    '[attr.data-size]': 'size()',
    '[attr.data-variant]': 'variant()',
  },
})
export class AevkoInputGroupButton {
  readonly size = input<'xs' | 'sm' | 'icon-xs' | 'icon-sm'>('xs');
  readonly variant = input<'ghost' | 'outline'>('ghost');
}
