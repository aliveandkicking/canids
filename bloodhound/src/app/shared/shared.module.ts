import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { PopupComponent } from './popup/popup.component';

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
  ]
})
export class SharedModule { }
