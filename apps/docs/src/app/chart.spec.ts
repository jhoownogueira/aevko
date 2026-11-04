import { TestBed } from '@angular/core/testing';
import { AevkoChartCanvas } from '../../../../registry/components/chart';
import { AevkoDashboard01Block } from '../../../../registry/components/blocks/dashboard-01';
import axe from 'axe-core';

describe('Chart data and accessible controls', () => {
  function setup(type: 'line' | 'doughnut' = 'line') {
    const fixture = TestBed.createComponent(AevkoChartCanvas);
    fixture.componentRef.setInput('label', 'Quarterly revenue');
    fixture.componentRef.setInput('type', type);
    fixture.componentRef.setInput('data', {
      labels: ['Jan', 'Feb'],
      datasets: [
        { label: 'Revenue', values: [120, 240] },
        { label: 'Costs', values: [80, null] },
      ],
    });
    fixture.detectChanges();
    return fixture;
  }
  it('keeps exact values in a native table and exposes named legend buttons', async () => {
    const fixture = setup();
    expect(fixture.nativeElement.querySelector('canvas').getAttribute('aria-label')).toContain(
      'Quarterly revenue',
    );
    expect(fixture.nativeElement.querySelectorAll('tbody tr').length).toBe(2);
    expect(fixture.nativeElement.querySelector('tbody').textContent).toContain('240');
    expect(fixture.nativeElement.querySelector('tbody').textContent).toContain('—');
    expect(
      (await axe.run(fixture.nativeElement, { rules: { 'color-contrast': { enabled: false } } }))
        .violations,
    ).toEqual([]);
  });
  it('toggles a series without removing its source values from the table', () => {
    const fixture = setup();
    const button = fixture.nativeElement.querySelector('.legend button') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(fixture.nativeElement.querySelector('tbody').textContent).toContain('120');
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });
  it('uses category labels for circular legends', () => {
    const fixture = setup('doughnut');
    const labels = [...fixture.nativeElement.querySelectorAll('.legend button')].map(
      (button: Element) => button.textContent?.trim(),
    );
    expect(labels).toEqual(['Jan', 'Feb']);
  });
  it('renders a useful empty state and formats percentages on a 0–100 scale', () => {
    const fixture = setup();
    fixture.componentRef.setInput('valueFormat', 'percent');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('tbody').textContent).toContain('120%');
    fixture.componentRef.setInput('data', { labels: [], datasets: [] });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('No data');
  });
});
describe('Dashboard workflows', () => {
  it('updates the chart period, filters projects, and exports the filtered data', () => {
    const fixture = TestBed.createComponent(AevkoDashboard01Block);
    const block = fixture.componentInstance;
    block.period.set('3');
    expect(block.revenue().labels).toEqual(['Apr', 'May', 'Jun']);
    expect(block.totalRevenue()).toBe(85400);
    expect(block.channels().datasets[0].values.reduce((sum, value) => sum + value, 0)).toBe(
      block.totalRevenue(),
    );
    expect(block.metrics()[0].value).toBe('$85,400');
    block.query.set('Atlas');
    expect(block.filteredProjects().length).toBe(1);
    expect(decodeURIComponent(block.exportUrl())).toContain('Atlas migration');
    expect(decodeURIComponent(block.exportUrl())).not.toContain('Checkout refresh');
  });
  it('creates projects and prevents duplicate names', () => {
    const fixture = TestBed.createComponent(AevkoDashboard01Block);
    const block = fixture.componentInstance;
    block.projectName.set('Customer portal');
    block.addProject(new Event('submit'));
    expect(block.projects().length).toBe(5);
    block.projectName.set('Customer portal');
    block.addProject(new Event('submit'));
    expect(block.projects().length).toBe(5);
    expect(block.notice()).toContain('already exists');
  });
});
