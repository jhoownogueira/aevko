import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages').then((module) => module.HomePage),
    title: 'Aevko UI - Angular components you own',
  },
  {
    path: 'getting-started',
    loadComponent: () => import('./pages').then((module) => module.GettingStartedPage),
    title: 'Installation - Aevko UI',
  },
  {
    path: 'components',
    loadComponent: () => import('./pages').then((module) => module.ComponentsPage),
    title: 'Components - Aevko UI',
  },
  {
    path: 'components/:slug',
    loadComponent: () => import('./pages').then((module) => module.ComponentPage),
    title: 'Component - Aevko UI',
  },
  {
    path: 'blocks',
    loadChildren: () => import('./block.routes').then((module) => module.blockRoutes),
  },
  {
    path: 'charts',
    loadComponent: () => import('./charts-page').then((module) => module.ChartsPage),
    title: 'Charts - Aevko UI',
  },
  {
    path: 'themes',
    loadComponent: () => import('./showcases').then((module) => module.ThemesPage),
    title: 'Themes - Aevko UI',
  },
  {
    path: 'typeset',
    loadComponent: () => import('./showcases').then((module) => module.TypesetPage),
    title: 'Typeset - Aevko UI',
  },
  {
    path: 'theming',
    loadComponent: () => import('./pages').then((module) => module.ThemingPage),
    title: 'Theming - Aevko UI',
  },
  {
    path: 'icons',
    loadComponent: () => import('./pages').then((module) => module.IconsPage),
    title: 'Icons - Aevko UI',
  },
  {
    path: 'cli',
    loadComponent: () => import('./pages').then((module) => module.CliPage),
    title: 'CLI and Registry - Aevko UI',
  },
  {
    path: 'contributing',
    loadComponent: () => import('./pages').then((module) => module.ContributingPage),
    title: 'Contributing - Aevko UI',
  },
  {
    path: 'layout-showcase',
    loadComponent: () => import('./layout-showcase').then((module) => module.LayoutShowcasePage),
    title: 'Layout showcase - Aevko UI',
  },
  { path: '**', redirectTo: '' },
];
