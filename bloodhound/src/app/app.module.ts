import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DayModule } from './day/day.module';

import { AppComponent } from './app.component';
import { CoreService } from './services/core.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DayModule
  ],
  providers: [CoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
