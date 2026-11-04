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
export interface AevkoComboboxItem {
  value: string;
  label: string;
  disabled?: boolean;
  keywords?: readonly string[];
}
@Component({
  selector: 'aevko-combobox',
  standalone: true,
  imports: [AevkoFloating],
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AevkoCombobox),
      multi: true,
    },
  ],
  host: {
    'data-slot': 'combobox',
    '(document:pointerdown)': 'dismissOutside($event)',
    '(document:focusin)': 'dismissOutside($event)',
    '[attr.data-disabled]': 'isDisabled() ? "true" : null',
  },
})
export class AevkoCombobox implements ControlValueAccessor {
  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  protected dismissOutside(event: Event): void {
    if (this.open() && !event.composedPath().includes(this.hostElement.nativeElement)) {
      this.open.set(false);
    }
  }

  readonly id = input('aevko-combobox');
  readonly label = input.required<string>();
  readonly placeholder = input('Search options…');
  readonly emptyMessage = input('No items found.');
  readonly items = input.required<readonly AevkoComboboxItem[]>();
  readonly value = model('');
  readonly query = model('');
  readonly disabled = input(false, { transform: booleanAttribute });
  protected readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly open = signal(false);
  protected readonly active = signal(0);
  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLocaleLowerCase();
    return this.items().filter(
      (item) =>
        !q || [item.label, ...(item.keywords ?? [])].join(' ').toLocaleLowerCase().includes(q),
    );
  });
  protected readonly enabledItems = computed(() =>
    this.filtered().filter((item) => !item.disabled),
  );
  protected readonly activeOption = computed(() => this.enabledItems()[this.active()]);
  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  protected inputValue(value: string): void {
    if (this.isDisabled()) {
      return;
    }
    this.query.set(value);
    this.open.set(true);
    this.active.set(0);
  }
  protected keydown(event: KeyboardEvent): void {
    const items = this.enabledItems();
    if (event.key === 'Escape') {
      this.open.set(false);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.open.set(true);
      if (!items.length) {
        return;
      }
      this.active.update(
        (i) => (i + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length,
      );
    } else if (event.key === 'Enter' && this.open()) {
      event.preventDefault();
      const item = items[this.active()];
      if (item) this.choose(item);
    }
  }
  protected choose(item: AevkoComboboxItem): void {
    if (!item.disabled) {
      this.value.set(item.value);
      this.query.set(item.label);
      this.onChange(item.value);
      this.onTouched();
      this.open.set(false);
    }
  }

  protected touch(): void {
    this.onTouched();
  }

  writeValue(value: string | null): void {
    const next = value ?? '';
    this.value.set(next);
    this.query.set(this.items().find((item) => item.value === next)?.label ?? '');
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
