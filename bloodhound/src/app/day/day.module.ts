import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayComponent } from './day.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DayComponent
  ],
  declarations: [DayComponent]
})
export class DayModule { }
