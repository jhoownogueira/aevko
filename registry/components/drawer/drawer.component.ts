import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AevkoDialog, AevkoDialogBase } from '../dialog';

@Component({
  selector: 'aevko-drawer',
  standalone: true,
  imports: [AevkoDialog],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(click)': 'handleClick($event)' },
})
export class AevkoDrawer extends AevkoDialogBase {
  constructor() {
    super('aevkoDrawerTrigger', 'aevkoDrawerClose');
  }
}
