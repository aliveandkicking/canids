import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DateHelperService } from "./services/date-helper.service";

import { AppComponent } from './app.component';
import { CalendarComponent, CreateTaskComponent, RepeatRulesComponent } from "./components";
import { WeekComponent } from './components/week/week.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CreateTaskComponent,
    RepeatRulesComponent,
    WeekComponent
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
