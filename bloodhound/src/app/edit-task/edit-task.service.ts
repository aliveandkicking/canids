import { Injectable } from '@angular/core';

@Injectable()
export class EditTaskService {
  public onShowEditTaskPopup: (taskId: number) => void = null;

  constructor( ) { }

  createTask(): void {
    this.editTask(null);
  }

  editTask(taskId: number): void {
    if (this.onShowEditTaskPopup) {
      this.onShowEditTaskPopup(taskId);
    }
  }
}
