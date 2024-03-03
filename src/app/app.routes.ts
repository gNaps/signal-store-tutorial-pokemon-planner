import { Routes } from '@angular/router';
import { TeamsComponent } from './@pages/teams/teams.component';
import { TeamsDetailComponent } from './@pages/teams/teams-detail/teams-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: TeamsComponent
  },
  {
    path: 'new',
    component: TeamsDetailComponent
  },
  {
    path: ':id',
    component: TeamsDetailComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
