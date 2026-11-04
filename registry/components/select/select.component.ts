import { AevkoFloating } from '../shared/floating.directive';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  booleanAttribute,
  computed,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
export interface AevkoSelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}
@Component({
  selector: 'aevko-select',
  standalone: true,
  imports: [AevkoFloating],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AevkoSelect),
      multi: true,
    },
  ],
  host: {
    'data-slot': 'select',
    '(document:pointerdown)': 'dismissOutside($event)',
    '(document:focusin)': 'dismissOutside($event)',
    '[attr.data-disabled]': 'isDisabled() ? "true" : null',
  },
})
export class AevkoSelect implements ControlValueAccessor {
  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  protected dismissOutside(event: Event): void {
    if (this.open() && !event.composedPath().includes(this.hostElement.nativeElement)) {
      this.open.set(false);
    }
  }

  readonly id = input('aevko-select');
  readonly label = input.required<string>();
  readonly placeholder = input('Select an option');
  readonly items = input.required<readonly AevkoSelectItem[]>();
  readonly value = model('');
  readonly disabled = input(false, { transform: booleanAttribute });
  protected readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly open = signal(false);
  protected readonly active = signal(0);
  protected readonly enabledItems = computed(() => this.items().filter((item) => !item.disabled));
  protected readonly activeOption = computed(() => this.enabledItems()[this.active()]);
  protected readonly selected = computed(() =>
    this.items().find((item) => item.value === this.value()),
  );
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected toggle(): void {
    if (this.isDisabled()) {
      return;
    }
    this.open.update((open) => !open);
    if (this.open()) {
      const selectedIndex = this.enabledItems().findIndex((item) => item.value === this.value());
      this.active.set(Math.max(0, selectedIndex));
    }
  }

  protected keydown(event: KeyboardEvent): void {
    const items = this.enabledItems();
    if (event.key === 'Escape') {
      this.open.set(false);
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    if (!this.open()) {
      this.open.set(true);
      return;
    }
    if (!items.length) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      const item = items[this.active()];
      if (item) this.choose(item);
    } else {
      this.active.update(
        (i) => (i + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length,
      );
    }
  }

  protected choose(item: AevkoSelectItem): void {
    if (!item.disabled) {
      this.value.set(item.value);
      this.onChange(item.value);
      this.onTouched();
      this.open.set(false);
    }
  }

  protected touch(): void {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.formDisabled.set(disabled);
    if (disabled) {
      this.open.set(false);
    }
  }
}
