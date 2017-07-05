import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageWeekComponent } from './components';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'week/:date',
    component: PageWeekComponent
  },
  {
    path: '**',
    redirectTo: 'week/07-07-2017'
  }
];

export const appRouterComponents = [PageWeekComponent];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})

export class AppRoutingModule {}
