import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { RepeatRulesComponent } from './repeat-rules/repeat-rules.component';
import { SharedModule } from '../shared/shared.module';
import { EditTaskPopupComponent } from './edit-task-popup/edit-task-popup.component';
import { EditTaskService } from './edit-task.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    EditTaskPopupComponent
  ],
  declarations: [
    EditTaskComponent,
    RepeatRulesComponent,
    EditTaskPopupComponent,
  ],
  providers: [
    EditTaskService
  ]
})
export class EditTaskModule { }
