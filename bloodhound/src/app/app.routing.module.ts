import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageEditTaskComponent, PageWeekComponent } from './components';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'edit',
    component: PageEditTaskComponent
  },
  {
    path: '**',
    component: PageWeekComponent
  }
];

export const appRouterComponents = [PageEditTaskComponent, PageWeekComponent];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})

export class AppRoutingModule {}
