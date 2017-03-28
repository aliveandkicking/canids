import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TasksComponent, TaskComponent]
})
export class TasksModule { }
