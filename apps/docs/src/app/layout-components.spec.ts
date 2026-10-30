import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import axe from 'axe-core';
import { AevkoAccordion } from '../../../../registry/components/accordion';
import { AevkoCarousel, AevkoCarouselSlide } from '../../../../registry/components/carousel';
import { AevkoCollapsible } from '../../../../registry/components/collapsible';
import { AevkoDirection } from '../../../../registry/components/direction';
import { AevkoResizable } from '../../../../registry/components/resizable';
import { AevkoSidebar } from '../../../../registry/components/sidebar';

@Component({
  standalone: true,
  imports: [AevkoAccordion, AevkoCollapsible, AevkoDirection],
  template: `
    <aevko-accordion [items]="items" />
    <aevko-collapsible label="Details">Disclosure content</aevko-collapsible>
    <div aevkoDirection="rtl">RTL content</div>
  `,
})
class DisclosureHost {
  items = [
    { id: 'one', label: 'First section', content: 'First content' },
    { id: 'two', label: 'Second section', content: 'Second content', disabled: true },
  ];
}

@Component({
  standalone: true,
  imports: [AevkoCarousel, AevkoCarouselSlide, AevkoResizable, AevkoSidebar],
  template: `
    <aevko-carousel label="Projects">
      <svg aevkoCarouselPreviousIcon data-testid="custom-previous" aria-hidden="true"></svg>
      <aevko-carousel-slide label="Slide 1 of 2">First</aevko-carousel-slide>
      <aevko-carousel-slide label="Slide 2 of 2">Second</aevko-carousel-slide>
    </aevko-carousel>
    <aevko-resizable
      ><div aevkoResizableFirst>One</div>
      <div aevkoResizableSecond>Two</div></aevko-resizable
    >
    <aevko-sidebar label="Workspace"><a href="#home">Home</a></aevko-sidebar>
  `,
})
class InteractiveLayoutHost {}

describe('layout primitives', () => {
  it('expands disclosures and preserves disabled items', async () => {
    const fixture = TestBed.createComponent(DisclosureHost);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('aevko-accordion button');
    buttons[0].click();
    fixture.detectChanges();
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    expect(buttons[1].disabled).toBe(true);
    const collapsible = fixture.nativeElement.querySelector('aevko-collapsible button');
    collapsible.click();
    fixture.detectChanges();
    expect(collapsible.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('[dir="rtl"]')).toBeTruthy();
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });

  it('supports carousel and resizer keyboard navigation', async () => {
    const fixture = TestBed.createComponent(InteractiveLayoutHost);
    fixture.detectChanges();
    await fixture.whenStable();
    const carousel = fixture.nativeElement.querySelector('aevko-carousel');
    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(carousel.textContent).toContain('2 / 2');
    expect(carousel.querySelector('[data-testid="custom-previous"]')).toBeTruthy();
    expect(carousel.querySelectorAll('button svg').length).toBeGreaterThanOrEqual(2);
    const handle = fixture.nativeElement.querySelector('[role="separator"]');
    handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(handle.getAttribute('aria-valuenow')).toBe('55');
    expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
  });
});
