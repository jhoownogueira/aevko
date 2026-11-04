import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { AevkoAvatar } from '../../avatar';
import { AevkoBadge } from '../../badge';
import { AevkoButton } from '../../button';
import { AevkoInput } from '../../input';
import { AevkoSidebar } from '../../sidebar';

@Component({
  selector: 'aevko-sidebar-02-block',
  standalone: true,
  imports: [AevkoAvatar, AevkoBadge, AevkoButton, AevkoInput, AevkoSidebar],
  templateUrl: './sidebar-02.component.html',
  styleUrl: './sidebar-02.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'sidebar-02' },
})
export class AevkoSidebar02Block {
  readonly navItems = ['Introduction', 'Installation', 'Components', 'Examples'];
  readonly query = signal('');
  readonly projectName = signal('');
  readonly selected = signal(this.navItems[0]);
  readonly creating = signal(false);
  readonly message = signal('');
  readonly filteredItems = computed(() =>
    this.navItems.filter((item) => item.toLowerCase().includes(this.query().trim().toLowerCase())),
  );
  readonly projects = signal<string[]>([]);
  create(event: Event, name: string): void {
    event.preventDefault();
    const value = name.trim();
    if (!value) {
      this.message.set('Enter a project name.');
      return;
    }
    if (this.projects().some((project) => project.toLowerCase() === value.toLowerCase())) {
      this.message.set('A project with this name already exists.');
      return;
    }
    this.projects.update((projects) => [...projects, value]);
    this.creating.set(false);
    this.projectName.set('');
    this.message.set('Project created: ' + value);
  }
  readonly activity = [
    { title: 'Review the latest workspace update', time: '8 min ago' },
    { title: 'A teammate completed a milestone', time: '42 min ago' },
    { title: 'A report is ready to inspect', time: '2 hr ago' },
  ];
}
