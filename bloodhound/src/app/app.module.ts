import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, appRouterComponents } from './app.routing.module';

import { SharedModule } from './shared/shared.module';
import { EditTaskModule } from './edit-task/edit-task.module';
import { DateHelperService } from './services/date-helper.service'; // biktop merge
import { AppComponent } from './app.component';
import { DayComponent } from './components';
import { WeekComponent } from './components/week/week.component';
import { DayTaskComponent } from './components/day-task/day-task.component';
import { DayTaskRootDirective } from './components/day-task/day-task-root.directive';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    WeekComponent,
    DayTaskComponent,
    appRouterComponents,
    DayTaskRootDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    EditTaskModule,
  ],
  providers: [
    DateHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
