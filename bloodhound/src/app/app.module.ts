import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, appRouterComponents } from './app.routing.module';

import { DateHelperService } from './services/date-helper.service';

import { AppComponent } from './app.component';
import {
  CalendarComponent,
  EditTaskComponent,
  RepeatRulesComponent,
  DayComponent
} from './components';

import { WeekComponent } from './components/week/week.component';
import { DayTaskComponent } from './components/day-task/day-task.component';

import { EditTaskService } from './services/edit-task.service';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EditTaskComponent,
    RepeatRulesComponent,
    DayComponent,
    WeekComponent,
    DayTaskComponent,
    appRouterComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    DateHelperService,
    EditTaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
