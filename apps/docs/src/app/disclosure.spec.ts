import { AevkoCommand } from '../../../../registry/components/command';
import { AevkoToaster } from '../../../../registry/components/toast';
import axe from 'axe-core';
import { AevkoDatePicker } from '../../../../registry/components/date-picker';
import { TestBed } from '@angular/core/testing';
import { AevkoCollapsible } from '../../../../registry/components/collapsible';
import { AevkoSidebar } from '../../../../registry/components/sidebar';

describe('Collapsible motion and semantics', () => {
  it('keeps closed content inert without using display none', () => {
    const fixture = TestBed.createComponent(AevkoCollapsible);
    fixture.componentRef.setInput('label', 'Project details');
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('.panel') as HTMLElement;
    expect(panel.inert).toBe(true);
    expect(panel.hidden).toBe(false);
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(panel.inert).toBe(false);
    expect(panel.getAttribute('data-state')).toBe('open');
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(panel.inert).toBe(true);
    expect(panel.getAttribute('aria-hidden')).toBe('true');
  });
  it('does not activate a disabled trigger', () => {
    const fixture = TestBed.createComponent(AevkoCollapsible);
    fixture.componentRef.setInput('label', 'Details');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    expect(fixture.componentInstance.open()).toBe(false);
  });
});
describe('Sidebar composition', () => {
  it('associates each mobile trigger with its own panel', () => {
    const first = TestBed.createComponent(AevkoSidebar);
    const second = TestBed.createComponent(AevkoSidebar);
    first.componentRef.setInput('id', 'workspace-navigation');
    second.componentRef.setInput('id', 'project-navigation');
    for (const fixture of [first, second]) {
      fixture.detectChanges();
      const panel = fixture.nativeElement.querySelector('aside');
      expect(
        fixture.nativeElement.querySelector('.mobile-trigger').getAttribute('aria-controls'),
      ).toBe(panel.id);
    }
    expect(first.nativeElement.querySelector('aside').id).not.toBe(
      second.nativeElement.querySelector('aside').id,
    );
  });
});

describe('Date picker composition', () => {
  it('names the inner popover independently for each date field', () => {
    for (const id of ['start-date', 'end-date']) {
      const fixture = TestBed.createComponent(AevkoDatePicker);
      fixture.componentRef.setInput('id', id);
      fixture.componentRef.setInput('label', id);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('[data-slot="popover-content"]').id).toBe(
        id + '-popover',
      );
    }
  });
});

describe('Empty command results', () => {
  it('announces no matches without exposing an empty listbox', async () => {
    const fixture = TestBed.createComponent(AevkoCommand);
    fixture.componentRef.setInput('label', 'Project commands');
    fixture.componentRef.setInput('items', [{ id: 'new', label: 'New project' }]);
    fixture.detectChanges();
    const search = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    search.value = 'unmatched query';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="listbox"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain(
      'No commands found',
    );
    const audit = await axe.run(fixture.nativeElement, {
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(audit.violations).toEqual([]);
    search.value = '';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="listbox"]')).not.toBeNull();
  });
});
describe('Toaster regions', () => {
  it('supports distinct names for multiple notification regions', () => {
    const fixture = TestBed.createComponent(AevkoToaster);
    fixture.componentRef.setInput('label', 'Project notifications');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('section').getAttribute('aria-label')).toBe(
      'Project notifications',
    );
  });
});
