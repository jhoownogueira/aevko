import { Routes } from '@angular/router';
import {
  CliPage,
  ComponentPage,
  ComponentsPage,
  ContributingPage,
  GettingStartedPage,
  HomePage,
  IconsPage,
  ThemingPage,
} from './pages';
import { LayoutShowcasePage } from './layout-showcase';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Aevko UI - Angular components you own' },
  { path: 'getting-started', component: GettingStartedPage, title: 'Installation - Aevko UI' },
  { path: 'components', component: ComponentsPage, title: 'Components - Aevko UI' },
  { path: 'components/:slug', component: ComponentPage, title: 'Component - Aevko UI' },
  { path: 'theming', component: ThemingPage, title: 'Theming - Aevko UI' },
  { path: 'icons', component: IconsPage, title: 'Icons - Aevko UI' },
  { path: 'cli', component: CliPage, title: 'CLI and Registry - Aevko UI' },
  { path: 'contributing', component: ContributingPage, title: 'Contributing - Aevko UI' },
  { path: 'layout-showcase', component: LayoutShowcasePage, title: 'Layout showcase - Aevko UI' },
  { path: '**', redirectTo: '' },
];
