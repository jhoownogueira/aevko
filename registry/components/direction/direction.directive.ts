import { Directive, InjectionToken, forwardRef, input } from '@angular/core';

export type AevkoDirectionValue = 'ltr' | 'rtl';
export const AEVKO_DIRECTION = new InjectionToken<AevkoDirection>('AEVKO_DIRECTION');

@Directive({
  selector: '[aevkoDirection]',
  standalone: true,
  host: { '[attr.dir]': 'aevkoDirection()' },
  providers: [{ provide: AEVKO_DIRECTION, useExisting: forwardRef(() => AevkoDirection) }],
})
export class AevkoDirection {
  readonly aevkoDirection = input<AevkoDirectionValue>('ltr');
}
