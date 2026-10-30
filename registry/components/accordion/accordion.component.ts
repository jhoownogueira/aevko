import { ChangeDetectionStrategy, Component, booleanAttribute, input, model } from '@angular/core';

export interface AevkoAccordionItem {
  id: string;
  label: string;
  content: string;
  disabled?: boolean;
}

@Component({
  selector: 'aevko-accordion',
  standalone: true,
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoAccordion {
  readonly items = input.required<readonly AevkoAccordionItem[]>();
  readonly type = input<'single' | 'multiple'>('single');
  readonly value = model<readonly string[]>([]);
  readonly collapsible = input(true, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly id = input('aevko-accordion');
  readonly headingLevel = input<2 | 3 | 4 | 5 | 6>(2);

  protected expanded(item: AevkoAccordionItem): boolean {
    return this.value().includes(item.id);
  }
  protected toggle(item: AevkoAccordionItem): void {
    if (this.disabled() || item.disabled) return;
    const current = this.value();
    if (this.expanded(item)) {
      if (this.collapsible() || this.type() === 'multiple')
        this.value.set(current.filter((id) => id !== item.id));
      return;
    }
    this.value.set(this.type() === 'single' ? [item.id] : [...current, item.id]);
  }
}
