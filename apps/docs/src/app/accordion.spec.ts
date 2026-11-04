import { TestBed } from '@angular/core/testing';
import { AevkoAccordion } from '../../../../registry/components/accordion';
import axe from 'axe-core';

describe('Accordion interaction contract', () => {
  const setup = () => {
    const fixture = TestBed.createComponent(AevkoAccordion);
    fixture.componentRef.setInput('id', 'faq');
    fixture.componentRef.setInput('items', [
      { id: 'one', label: 'First question', content: 'First answer' },
      { id: 'two', label: 'Second question', content: 'Second answer' },
      {
        id: 'disabled',
        label: 'Unavailable question',
        content: 'Unavailable answer',
        disabled: true,
      },
    ]);
    fixture.detectChanges();
    return fixture;
  };
  it('keeps closed content inert while allowing its layout to animate', () => {
    const fixture = setup();
    const panel = fixture.nativeElement.querySelector('[role="region"]') as HTMLElement;
    expect(panel.inert).toBe(true);
    expect(panel.getAttribute('aria-hidden')).toBe('true');
    expect(panel.hidden).toBe(false);
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(panel.inert).toBe(false);
    expect(panel.getAttribute('data-state')).toBe('open');
    fixture.nativeElement.querySelectorAll('button')[1].click();
    fixture.detectChanges();
    expect(panel.inert).toBe(true);
    expect(fixture.componentInstance.value()).toEqual(['two']);
  });
  it('supports multiple open items without activating disabled triggers', () => {
    const fixture = setup();
    fixture.componentRef.setInput('type', 'multiple');
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();
    buttons[1].click();
    buttons[2].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toEqual(['one', 'two']);
  });
  it('retains one open item when non-collapsible', () => {
    const fixture = setup();
    fixture.componentRef.setInput('collapsible', false);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button');
    trigger.click();
    trigger.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toEqual(['one']);
  });
  it('exposes associated headings and regions without axe violations', async () => {
    const fixture = setup();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });
  it('gives repeated panels contextual accessible names when labelled', () => {
    const fixture = setup();
    fixture.componentRef.setInput('label', 'Billing questions');
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('[role="region"]') as HTMLElement;
    expect(panel.getAttribute('aria-label')).toBe('Billing questions: First question');
    expect(panel.hasAttribute('aria-labelledby')).toBe(false);
  });
});
