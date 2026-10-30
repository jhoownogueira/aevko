import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'aevko-avatar',
  standalone: true,
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[style.--aevko-avatar-size]': 'size()' },
})
export class AevkoAvatar {
  readonly src = input<string | null>(null);
  readonly alt = input.required<string>();
  readonly fallback = input.required<string>();
  readonly size = input('2.5rem');
  protected readonly failed = signal(false);
  protected readonly showImage = computed(() => Boolean(this.src()) && !this.failed());
}
