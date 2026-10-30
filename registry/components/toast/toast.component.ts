import { ChangeDetectionStrategy, Component, Injectable, computed, signal } from '@angular/core';

export type AevkoToastTone = 'default' | 'success' | 'info' | 'warning' | 'error';
export interface AevkoToastOptions {
  description?: string;
  tone?: AevkoToastTone;
  duration?: number;
  actionLabel?: string;
  action?: () => void;
}
export interface AevkoToastItem extends AevkoToastOptions {
  id: string;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class AevkoToastStore {
  private readonly state = signal<readonly AevkoToastItem[]>([]);
  private nextId = 0;
  readonly toasts = computed(() => this.state());
  show(title: string, options: AevkoToastOptions = {}): string {
    const id = `aevko-toast-${++this.nextId}`;
    this.state.update((items) => [...items, { id, title, ...options }]);
    const duration = options.duration ?? 5000;
    if (duration > 0) setTimeout(() => this.dismiss(id), duration);
    return id;
  }
  dismiss(id: string): void {
    this.state.update((items) => items.filter((item) => item.id !== id));
  }
  clear(): void {
    this.state.set([]);
  }
  runAction(toast: AevkoToastItem): void {
    toast.action?.();
    this.dismiss(toast.id);
  }
}

@Component({
  selector: 'aevko-toaster',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AevkoToaster {
  constructor(protected readonly store: AevkoToastStore) {}
}
