import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'aevko-aspect-ratio',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './aspect-ratio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.aspect-ratio]': 'cssRatio()' },
})
export class AevkoAspectRatio {
  readonly ratio = input<number | `${number}/${number}`>(16 / 9);
  protected readonly cssRatio = computed(() =>
    typeof this.ratio() === 'number' ? String(this.ratio()) : this.ratio(),
  );
}
