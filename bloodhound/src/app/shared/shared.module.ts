import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { PopupComponent } from './popup/popup.component';
import { DateUtilsService } from './services/date-utils.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CalendarComponent,
    PopupComponent
  ],
  declarations: [
    CalendarComponent,
    PopupComponent
  ],
  providers: [
    DateUtilsService
  ]
})
export class SharedModule { }
