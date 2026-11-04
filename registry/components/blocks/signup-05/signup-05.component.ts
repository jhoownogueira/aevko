import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { AevkoButton } from '../../button';
import { AevkoCheckbox } from '../../checkbox';
import { AevkoInput } from '../../input';
import { AevkoLabel } from '../../label';

@Component({
  selector: 'aevko-signup-05-block',
  standalone: true,
  imports: [AevkoButton, AevkoCheckbox, AevkoInput, AevkoLabel],
  templateUrl: './signup-05.component.html',
  styleUrl: './signup-05.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'signup-05' },
})
export class AevkoSignup05Block {
  readonly alternateUrl = input<string | null>(null);
  readonly recoveryUrl = input<string | null>(null);
  readonly submitted = output<{
    email: string;
    password: string;
    name: string;
    remember: boolean;
  }>();
  readonly status = signal('');
  submit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    this.submitted.emit({
      email: String(data.get('email') ?? ''),
      password: String(data.get('password') ?? ''),
      name: String(data.get('name') ?? ''),
      remember: data.has('remember'),
    });
    this.status.set('Form validated. This preview does not send credentials or create a session.');
    const password = form.elements.namedItem('password') as HTMLInputElement | null;
    if (password) password.value = '';
  }
}
