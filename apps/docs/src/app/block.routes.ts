import { Routes } from '@angular/router';
import { BlocksPage } from './blocks';

export const blockRoutes: Routes = [
  { path: '', component: BlocksPage, title: 'Blocks - Aevko UI' },
  {
    path: 'dashboard-01',
    loadComponent: () =>
      import('../../../../registry/components/blocks/dashboard-01').then(
        (module) => module.AevkoDashboard01Block,
      ),
    title: 'Operations dashboard - Aevko UI',
  },
  {
    path: 'login-01',
    loadComponent: () =>
      import('../../../../registry/components/blocks/login-01').then(
        (module) => module.AevkoLogin01Block,
      ),
    title: 'Sign in 01 - Aevko UI',
  },
  {
    path: 'login-02',
    loadComponent: () =>
      import('../../../../registry/components/blocks/login-02').then(
        (module) => module.AevkoLogin02Block,
      ),
    title: 'Sign in 02 - Aevko UI',
  },
  {
    path: 'login-03',
    loadComponent: () =>
      import('../../../../registry/components/blocks/login-03').then(
        (module) => module.AevkoLogin03Block,
      ),
    title: 'Sign in 03 - Aevko UI',
  },
  {
    path: 'login-04',
    loadComponent: () =>
      import('../../../../registry/components/blocks/login-04').then(
        (module) => module.AevkoLogin04Block,
      ),
    title: 'Sign in 04 - Aevko UI',
  },
  {
    path: 'login-05',
    loadComponent: () =>
      import('../../../../registry/components/blocks/login-05').then(
        (module) => module.AevkoLogin05Block,
      ),
    title: 'Sign in 05 - Aevko UI',
  },
  {
    path: 'signup-01',
    loadComponent: () =>
      import('../../../../registry/components/blocks/signup-01').then(
        (module) => module.AevkoSignup01Block,
      ),
    title: 'Sign up 01 - Aevko UI',
  },
  {
    path: 'signup-02',
    loadComponent: () =>
      import('../../../../registry/components/blocks/signup-02').then(
        (module) => module.AevkoSignup02Block,
      ),
    title: 'Sign up 02 - Aevko UI',
  },
  {
    path: 'signup-03',
    loadComponent: () =>
      import('../../../../registry/components/blocks/signup-03').then(
        (module) => module.AevkoSignup03Block,
      ),
    title: 'Sign up 03 - Aevko UI',
  },
  {
    path: 'signup-04',
    loadComponent: () =>
      import('../../../../registry/components/blocks/signup-04').then(
        (module) => module.AevkoSignup04Block,
      ),
    title: 'Sign up 04 - Aevko UI',
  },
  {
    path: 'signup-05',
    loadComponent: () =>
      import('../../../../registry/components/blocks/signup-05').then(
        (module) => module.AevkoSignup05Block,
      ),
    title: 'Sign up 05 - Aevko UI',
  },
  {
    path: 'sidebar-01',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-01').then(
        (module) => module.AevkoSidebar01Block,
      ),
    title: 'Sidebar 01 - Aevko UI',
  },
  {
    path: 'sidebar-02',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-02').then(
        (module) => module.AevkoSidebar02Block,
      ),
    title: 'Sidebar 02 - Aevko UI',
  },
  {
    path: 'sidebar-03',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-03').then(
        (module) => module.AevkoSidebar03Block,
      ),
    title: 'Sidebar 03 - Aevko UI',
  },
  {
    path: 'sidebar-04',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-04').then(
        (module) => module.AevkoSidebar04Block,
      ),
    title: 'Sidebar 04 - Aevko UI',
  },
  {
    path: 'sidebar-05',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-05').then(
        (module) => module.AevkoSidebar05Block,
      ),
    title: 'Sidebar 05 - Aevko UI',
  },
  {
    path: 'sidebar-06',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-06').then(
        (module) => module.AevkoSidebar06Block,
      ),
    title: 'Sidebar 06 - Aevko UI',
  },
  {
    path: 'sidebar-07',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-07').then(
        (module) => module.AevkoSidebar07Block,
      ),
    title: 'Sidebar 07 - Aevko UI',
  },
  {
    path: 'sidebar-08',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-08').then(
        (module) => module.AevkoSidebar08Block,
      ),
    title: 'Sidebar 08 - Aevko UI',
  },
  {
    path: 'sidebar-09',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-09').then(
        (module) => module.AevkoSidebar09Block,
      ),
    title: 'Sidebar 09 - Aevko UI',
  },
  {
    path: 'sidebar-10',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-10').then(
        (module) => module.AevkoSidebar10Block,
      ),
    title: 'Sidebar 10 - Aevko UI',
  },
  {
    path: 'sidebar-11',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-11').then(
        (module) => module.AevkoSidebar11Block,
      ),
    title: 'Sidebar 11 - Aevko UI',
  },
  {
    path: 'sidebar-12',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-12').then(
        (module) => module.AevkoSidebar12Block,
      ),
    title: 'Sidebar 12 - Aevko UI',
  },
  {
    path: 'sidebar-13',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-13').then(
        (module) => module.AevkoSidebar13Block,
      ),
    title: 'Sidebar 13 - Aevko UI',
  },
  {
    path: 'sidebar-14',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-14').then(
        (module) => module.AevkoSidebar14Block,
      ),
    title: 'Sidebar 14 - Aevko UI',
  },
  {
    path: 'sidebar-15',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-15').then(
        (module) => module.AevkoSidebar15Block,
      ),
    title: 'Sidebar 15 - Aevko UI',
  },
  {
    path: 'sidebar-16',
    loadComponent: () =>
      import('../../../../registry/components/blocks/sidebar-16').then(
        (module) => module.AevkoSidebar16Block,
      ),
    title: 'Sidebar 16 - Aevko UI',
  },
];

blockRoutes.push(
  ...blockRoutes
    .filter((route) => route.path)
    .map((route) => ({ ...route, path: `preview/${route.path}` })),
);
