import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AevkoDialog, AevkoDialogBase } from '../dialog';

@Component({
  selector: 'aevko-sheet',
  standalone: true,
  imports: [AevkoDialog],
  templateUrl: './sheet.component.html',
  styleUrl: './sheet.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(click)': 'handleClick($event)' },
})
export class AevkoSheet extends AevkoDialogBase {
  constructor() {
    super('aevkoSheetTrigger', 'aevkoSheetClose');
  }
}
