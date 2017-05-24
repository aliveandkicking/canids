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
    path: '**',
    component: PageWeekComponent
  }
];

export const appRouterComponents = [PageWeekComponent];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})

export class AppRoutingModule {}
