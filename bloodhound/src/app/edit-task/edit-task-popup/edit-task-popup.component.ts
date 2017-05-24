import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { PopupComponent } from '../../shared/popup/popup.component';
import { EditTaskService } from '../edit-task.service';


@Component({
  selector: 'app-edit-task-popup',
  templateUrl: './edit-task-popup.component.html',
  styleUrls: ['./edit-task-popup.component.css']
})
export class EditTaskPopupComponent implements OnInit, OnDestroy {
  @ViewChild('popupComponent') popupComponent: PopupComponent;
  @ViewChild('editTaskComponent') editTaskComponent: EditTaskComponent;

  constructor(
    private editTaskService: EditTaskService
  ) { }

  ngOnInit() {
    this.editTaskService.onShowEditTaskPopup = this.edit.bind(this);
  }

  ngOnDestroy() {
    this.editTaskService.onShowEditTaskPopup = null;
  }

  edit(taskId: number): void {
    this.popupComponent.showPopup();
  }

  save(): void {
    this.editTaskComponent.save();
    this.popupComponent.closePopup();
  }

  cancel(popupComponent: PopupComponent): void {
    this.popupComponent.closePopup();
  }

}
