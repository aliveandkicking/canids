import { Component, OnInit } from '@angular/core';
import { EditTaskService } from '../../services/edit-task.service';


@Component({
  selector: 'app-page-week',
  templateUrl: './page-week.component.html',
  styleUrls: ['./page-week.component.css']
})
export class PageWeekComponent implements OnInit {

  constructor(
    private editTaskService: EditTaskService
  ) { }

  ngOnInit() {
  }

  goToNewTaskPage() {
    this.editTaskService.createTask();
  }

  today() {

  }

  next() {

  }

  prev() {

  }

  log(el: any) {
    console.dir(el);
  }
}
