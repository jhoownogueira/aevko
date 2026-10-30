import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'aevko-attachment',
  standalone: true,
  templateUrl: './attachment.component.html',
  styleUrl: './attachment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoAttachment {
  readonly name = input.required<string>();
  readonly metadata = input<string>();
}
