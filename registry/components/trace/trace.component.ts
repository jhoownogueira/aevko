import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'aevko-trace',
  standalone: true,
  template: '<div role="list" [attr.aria-label]="label()"><ng-content /></div>',
  styleUrl: './trace.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoTrace {
  readonly label = input('Event trace');
}

@Component({
  selector: 'aevko-trace-item',
  standalone: true,
  template:
    '<div class="item"><span class="marker" aria-hidden="true"></span><div><div class="header"><ng-content select="[aevkoTraceTitle]" /><ng-content select="[aevkoTraceTime]" /></div><div class="detail"><ng-content /></div></div></div>',
  styleUrl: './trace-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { role: 'listitem', '[attr.data-state]': 'state()' },
})
export class AevkoTraceItem {
  readonly state = input<'complete' | 'running' | 'error' | 'pending'>('complete');
}
