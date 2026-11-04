import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import axe from 'axe-core';
import { BlocksPage } from './blocks';

const BLOCK_COMPONENTS: Array<{ name: string; load: () => Promise<Type<unknown>> }> = [
  {
    name: 'dashboard-01',
    load: () =>
      import('../../../../registry/components/blocks/dashboard-01').then(
        (module) => module.AevkoDashboard01Block,
      ),
  },
  {
    name: 'login-01',
    load: () =>
      import('../../../../registry/components/blocks/login-01').then(
        (module) => module.AevkoLogin01Block,
      ),
  },
  {
    name: 'login-02',
    load: () =>
      import('../../../../registry/components/blocks/login-02').then(
        (module) => module.AevkoLogin02Block,
      ),
  },
  {
    name: 'login-03',
    load: () =>
      import('../../../../registry/components/blocks/login-03').then(
        (module) => module.AevkoLogin03Block,
      ),
  },
  {
    name: 'login-04',
    load: () =>
      import('../../../../registry/components/blocks/login-04').then(
        (module) => module.AevkoLogin04Block,
      ),
  },
  {
    name: 'login-05',
    load: () =>
      import('../../../../registry/components/blocks/login-05').then(
        (module) => module.AevkoLogin05Block,
      ),
  },
  {
    name: 'signup-01',
    load: () =>
      import('../../../../registry/components/blocks/signup-01').then(
        (module) => module.AevkoSignup01Block,
      ),
  },
  {
    name: 'signup-02',
    load: () =>
      import('../../../../registry/components/blocks/signup-02').then(
        (module) => module.AevkoSignup02Block,
      ),
  },
  {
    name: 'signup-03',
    load: () =>
      import('../../../../registry/components/blocks/signup-03').then(
        (module) => module.AevkoSignup03Block,
      ),
  },
  {
    name: 'signup-04',
    load: () =>
      import('../../../../registry/components/blocks/signup-04').then(
        (module) => module.AevkoSignup04Block,
      ),
  },
  {
    name: 'signup-05',
    load: () =>
      import('../../../../registry/components/blocks/signup-05').then(
        (module) => module.AevkoSignup05Block,
      ),
  },
  {
    name: 'sidebar-01',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-01').then(
        (module) => module.AevkoSidebar01Block,
      ),
  },
  {
    name: 'sidebar-02',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-02').then(
        (module) => module.AevkoSidebar02Block,
      ),
  },
  {
    name: 'sidebar-03',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-03').then(
        (module) => module.AevkoSidebar03Block,
      ),
  },
  {
    name: 'sidebar-04',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-04').then(
        (module) => module.AevkoSidebar04Block,
      ),
  },
  {
    name: 'sidebar-05',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-05').then(
        (module) => module.AevkoSidebar05Block,
      ),
  },
  {
    name: 'sidebar-06',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-06').then(
        (module) => module.AevkoSidebar06Block,
      ),
  },
  {
    name: 'sidebar-07',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-07').then(
        (module) => module.AevkoSidebar07Block,
      ),
  },
  {
    name: 'sidebar-08',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-08').then(
        (module) => module.AevkoSidebar08Block,
      ),
  },
  {
    name: 'sidebar-09',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-09').then(
        (module) => module.AevkoSidebar09Block,
      ),
  },
  {
    name: 'sidebar-10',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-10').then(
        (module) => module.AevkoSidebar10Block,
      ),
  },
  {
    name: 'sidebar-11',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-11').then(
        (module) => module.AevkoSidebar11Block,
      ),
  },
  {
    name: 'sidebar-12',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-12').then(
        (module) => module.AevkoSidebar12Block,
      ),
  },
  {
    name: 'sidebar-13',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-13').then(
        (module) => module.AevkoSidebar13Block,
      ),
  },
  {
    name: 'sidebar-14',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-14').then(
        (module) => module.AevkoSidebar14Block,
      ),
  },
  {
    name: 'sidebar-15',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-15').then(
        (module) => module.AevkoSidebar15Block,
      ),
  },
  {
    name: 'sidebar-16',
    load: () =>
      import('../../../../registry/components/blocks/sidebar-16').then(
        (module) => module.AevkoSidebar16Block,
      ),
  },
];

describe('Blocks', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('publishes all 27 compositions in the catalog', async () => {
    const fixture = TestBed.createComponent(BlocksPage);
    fixture.detectChanges();

    const all = [...fixture.nativeElement.querySelectorAll('button')].find(
      (button) => (button as HTMLButtonElement).textContent?.trim() === 'All',
    ) as HTMLButtonElement;
    all.click();
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll(
      'article a',
    ) as NodeListOf<HTMLAnchorElement>;
    expect(links.length).toBe(27);
    expect(links[0].getAttribute('href')).toBe('/blocks/dashboard-01');
    // JSDOM cannot navigate frames. Browser tests audit each real preview separately.
    expect((await axe.run(fixture.nativeElement, { iframes: false })).violations).toEqual([]);
  });

  for (const block of BLOCK_COMPONENTS) {
    it(`renders accessible canonical source for ${block.name}`, async () => {
      const component = await block.load();
      const fixture = TestBed.createComponent(component);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('[data-slot$="-block"]')).toBeTruthy();
      expect((await axe.run(fixture.nativeElement)).violations).toEqual([]);
    });

    if (block.name.startsWith('sidebar-')) {
      it(`filters navigation and creates local projects in ${block.name}`, async () => {
        const fixture = TestBed.createComponent(await block.load());
        fixture.detectChanges();
        const host = fixture.nativeElement as HTMLElement;
        const search = host.querySelector('input[type="search"]') as HTMLInputElement;
        search.value = 'no matching navigation';
        search.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(host.querySelectorAll('.sidebar-nav a').length).toBe(0);
        expect(host.textContent).toContain('No matching pages.');
        search.value = '';
        search.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        const links = host.querySelectorAll<HTMLAnchorElement>('.sidebar-nav a');
        links[1].click();
        fixture.detectChanges();
        expect(host.querySelector('h1')?.textContent?.trim()).toBe(
          links[1].textContent?.replace('›', '').trim(),
        );
        host.querySelector<HTMLButtonElement>('.block-toolbar button')!.click();
        fixture.detectChanges();
        const input = host.querySelector('form input') as HTMLInputElement;
        input.value = 'Launch review';
        input.dispatchEvent(new Event('input'));
        host.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
        fixture.detectChanges();
        expect(host.querySelector('[aria-label="Created projects"]')?.textContent).toContain(
          'Launch review',
        );
        expect(host.querySelector('[role="status"]')?.textContent).toContain('Project created');
        expect((await axe.run(host)).violations).toEqual([]);
      });
    }
    if (/^(login|signup)-/.test(block.name)) {
      it(`validates and emits credentials without sending them in ${block.name}`, async () => {
        const fixture = TestBed.createComponent(await block.load());
        fixture.detectChanges();
        const host = fixture.nativeElement as HTMLElement;
        const form = host.querySelector('form')!;
        const instance = fixture.componentInstance as unknown as {
          submitted: {
            subscribe(callback: (value: { email: string; password: string }) => void): void;
          };
        };
        const values: { email: string; password: string }[] = [];
        instance.submitted.subscribe((value) => values.push(value));
        form.dispatchEvent(new Event('submit', { cancelable: true }));
        expect(values).toHaveLength(0);
        for (const input of host.querySelectorAll<HTMLInputElement>('input')) {
          input.value = input.type === 'email' ? 'demo@example.com' : 'example-password';
          if (input.type === 'checkbox') input.checked = true;
        }
        form.dispatchEvent(new Event('submit', { cancelable: true }));
        fixture.detectChanges();
        expect(values).toEqual([
          {
            email: 'demo@example.com',
            password: 'example-password',
            name: block.name.startsWith('signup') ? 'example-password' : '',
            remember: block.name.startsWith('login'),
          },
        ]);
        expect(host.querySelector<HTMLInputElement>('[name="password"]')!.value).toBe('');
        expect(host.querySelector('[role="status"]')?.textContent).toContain('Form validated');
        expect(host.querySelector('a[href="#alternate"], a[href="#recover"]')).toBeNull();
      });
    }
  }
});
