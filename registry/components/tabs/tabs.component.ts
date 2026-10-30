import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';

@Component({
  selector: 'button[aevkoTabsTrigger]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './tabs-trigger.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    type: 'button',
    role: 'tab',
    '[attr.id]': 'rootId() + "-tab-" + value()',
    '[attr.aria-controls]': 'rootId() + "-panel-" + value()',
    '[attr.aria-selected]': 'selected()',
    '[attr.tabindex]': 'selected() ? 0 : -1',
    '[attr.data-state]': 'selected() ? "active" : "inactive"',
  },
})
export class AevkoTabsTrigger {
  readonly value = input.required<string>();
  readonly groupValue = signal('');
  readonly rootId = signal('aevko-tabs');
  readonly selected = computed(() => this.groupValue() === this.value());
  readonly element = inject<ElementRef<HTMLButtonElement>>(ElementRef);
}

@Component({
  selector: 'aevko-tabs-content',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './tabs-content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'tabpanel',
    '[attr.id]': 'rootId() + "-panel-" + value()',
    '[attr.aria-labelledby]': 'rootId() + "-tab-" + value()',
    '[attr.tabindex]': 'selected() ? 0 : -1',
    '[hidden]': '!selected()',
  },
})
export class AevkoTabsContent {
  readonly value = input.required<string>();
  readonly groupValue = signal('');
  readonly rootId = signal('aevko-tabs');
  readonly selected = computed(() => this.groupValue() === this.value());
}

@Component({
  selector: 'aevko-tabs-list',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './tabs-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'tablist',
    '[attr.aria-label]': 'label()',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.data-orientation]': 'orientation()',
  },
})
export class AevkoTabsList {
  readonly label = signal('Tabs');
  readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
}

@Component({
  selector: 'aevko-tabs',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './tabs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-orientation]': 'orientation()',
    '(click)': 'activate($event)',
    '(keydown)': 'navigate($event)',
  },
})
export class AevkoTabs {
  readonly label = input.required<string>();
  readonly id = input('aevko-tabs');
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly activation = input<'automatic' | 'manual'>('automatic');
  readonly value = model('');
  private readonly triggers = contentChildren(AevkoTabsTrigger, { descendants: true });
  private readonly panels = contentChildren(AevkoTabsContent);
  private readonly lists = contentChildren(AevkoTabsList);

  constructor() {
    effect(() => {
      const triggers = this.triggers();
      const selected = this.value() || triggers[0]?.value() || '';
      if (!this.value() && selected) this.value.set(selected);
      for (const trigger of triggers) {
        trigger.groupValue.set(selected);
        trigger.rootId.set(this.id());
      }
      for (const panel of this.panels()) {
        panel.groupValue.set(selected);
        panel.rootId.set(this.id());
      }
      for (const list of this.lists()) {
        list.label.set(this.label());
        list.orientation.set(this.orientation());
      }
    });
  }

  protected activate(event: MouseEvent): void {
    const trigger = this.triggers().find(({ element }) =>
      element.nativeElement.contains(event.target as Node),
    );
    if (trigger && !trigger.element.nativeElement.disabled) this.value.set(trigger.value());
  }

  protected navigate(event: KeyboardEvent): void {
    const axis =
      this.orientation() === 'vertical' ? ['ArrowUp', 'ArrowDown'] : ['ArrowLeft', 'ArrowRight'];
    if (![...axis, 'Home', 'End', 'Enter', ' '].includes(event.key)) return;
    const enabled = this.triggers().filter(({ element }) => !element.nativeElement.disabled);
    const current = enabled.findIndex(({ element }) => element.nativeElement === event.target);
    if (current < 0) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.value.set(enabled[current]!.value());
      return;
    }
    event.preventDefault();
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? enabled.length - 1
          : (current + (event.key === axis[0] ? -1 : 1) + enabled.length) % enabled.length;
    const target = enabled[next];
    target?.element.nativeElement.focus();
    if (target && this.activation() === 'automatic') this.value.set(target.value());
  }
}
