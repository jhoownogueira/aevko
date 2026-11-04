import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import axe from 'axe-core';
import { AevkoKbd, AevkoKbdGroup } from '../../../../registry/components/kbd';

@Component({
  standalone: true,
  imports: [AevkoKbd, AevkoKbdGroup],
  template: `
    <p>
      Open command palette
      <span aevkoKbdGroup aria-label="Command Shift P">
        <kbd aevkoKbd>⌘</kbd>
        <kbd aevkoKbd>⇧</kbd>
        <kbd aevkoKbd size="sm">P</kbd>
      </span>
    </p>
  `,
})
class KbdHost {}

describe('Kbd', () => {
  it('preserves native key semantics and groups projected shortcuts', async () => {
    const fixture = TestBed.createComponent(KbdHost);
    fixture.detectChanges();

    const keys = fixture.nativeElement.querySelectorAll('kbd[aevkoKbd]') as NodeListOf<HTMLElement>;
    const group = fixture.nativeElement.querySelector('span[aevkoKbdGroup]') as HTMLElement;

    expect(keys.length).toBe(3);
    expect(keys[0].tagName).toBe('KBD');
    expect(keys[2].getAttribute('data-size')).toBe('sm');
    expect(group.getAttribute('aria-label')).toBe('Command Shift P');
    expect(group.textContent).toContain('⌘');
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });
});
