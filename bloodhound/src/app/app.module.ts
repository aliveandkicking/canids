import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DateHelperService } from './services/date-helper.service';

import { AppComponent } from './app.component';
import {
  CalendarComponent,
  CreateTaskComponent,
  RepeatRulesComponent,
  DayComponent
} from './components';

import { WeekComponent } from './components/week/week.component';
import { DayTaskComponent } from './components/day-task/day-task.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CreateTaskComponent,
    RepeatRulesComponent,
    DayComponent,
    WeekComponent,
    DayTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    DateHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
