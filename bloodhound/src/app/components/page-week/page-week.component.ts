import { Component, OnInit, OnDestroy } from '@angular/core';
import { EditTaskService } from '../../edit-task/edit-task.service';
import { ActivatedRoute } from '@angular/router';
import { DateUtilsService } from '../../shared/services/date-utils.service';

@Component({
  selector: 'pl-page-week',
  templateUrl: './page-week.component.html',
  styleUrls: ['./page-week.component.css'],
})
export class PageWeekComponent implements OnInit {
  private dateString: string;
  private sub: any;

  constructor(
    private editTaskService: EditTaskService,
    private route: ActivatedRoute,
    private dateUtilsService: DateUtilsService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.dateString = params['date'];
    });
  }

  goToNewTaskPage() {
    this.editTaskService.createTask();
  }

  parseDateStr(): Date {
    console.log(this.dateString);
    return this.dateUtilsService.parseDateStrWithDef(this.dateString);
  }
}
