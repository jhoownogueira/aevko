import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AevkoDialog, AevkoDialogBase } from '../dialog';

@Component({
  selector: 'aevko-alert-dialog',
  standalone: true,
  imports: [AevkoDialog],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(click)': 'handleClick($event)' },
})
export class AevkoAlertDialog extends AevkoDialogBase {
  constructor() {
    super('aevkoAlertDialogTrigger', 'aevkoAlertDialogClose');
  }
}
