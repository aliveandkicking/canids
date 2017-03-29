import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DayComponent } from './components/day/day.component';
import { TaskComponent } from './components/task/task.component';

import { CoreService } from './services/core.service';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
  ],
  providers: [CoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
