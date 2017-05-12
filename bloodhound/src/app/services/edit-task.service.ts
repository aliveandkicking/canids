import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class EditTaskService {
  redirectUrl: string = null;

  constructor(
    private router: Router
  ) { }

  createTask() {
    this.redirectUrl = this.router.url;
    this.router.navigate(['edit']);
  }

  editTask(taskId: number) {
    this.redirectUrl = this.router.url;
    this.router.navigate(['edit']);
  }

  finishEditing() {
    const url = this.redirectUrl ? this.redirectUrl : '';
    this.router.navigate([url]);
  }
}
