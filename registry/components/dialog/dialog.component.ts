import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AevkoDialogBase } from './dialog-base';

@Component({
  selector: 'aevko-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(click)': 'handleClick($event)' },
})
export class AevkoDialog extends AevkoDialogBase {
  constructor() {
    super('aevkoDialogTrigger', 'aevkoDialogClose');
  }
}
