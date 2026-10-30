import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'aevko-progress',
  standalone: true,
  template: '<span class="indicator" [style.inline-size.%]="percentage()"></span>',
  styleUrl: './progress.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'progressbar',
    '[attr.aria-label]': 'label()',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'max()',
    '[attr.aria-valuenow]': 'value() === null ? null : normalized()',
    '[attr.data-state]': 'value() === null ? "indeterminate" : "determinate"',
  },
})
export class AevkoProgress {
  readonly label = input.required<string>();
  readonly value = input<number | null>(null);
  readonly max = input(100);
  protected readonly normalized = computed(() =>
    Math.min(Math.max(this.value() ?? 0, 0), Math.max(this.max(), 1)),
  );
  protected readonly percentage = computed(
    () => (this.normalized() / Math.max(this.max(), 1)) * 100,
  );
}
