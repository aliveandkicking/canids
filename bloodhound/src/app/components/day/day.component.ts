import { Component, OnInit, OnDestroy, Inject, Input, NgZone } from '@angular/core';
import { DayViewModel } from '../../../../../shared/viewmodels/day.viewmodel';
import { DayTaskViewModel } from '../../../../../shared/viewmodels/day-task.viewmodel';

@Component({
  selector: 'pl-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit, OnDestroy {
  @Input() viewModel: DayViewModel = null;

  constructor(
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.viewModel.setOnTaskListChange(() => {
      this.zone.run(() => {}); // biktop. investigate
    });
  }

  ngOnDestroy() {
    this.viewModel.finalize();
  }

  getDate () {
    return this.viewModel.getDate();
  }

  getTasksViewModels(): DayTaskViewModel[] {
    return this.viewModel.getDayTasksViewModels();
  }

  getNumberOfDoneTasks(): number {
    let result = 0;
    this.getTasksViewModels().forEach(viewModel => {
      if (viewModel.getIsDone()) {
        result++;
      }
    });
    return result;
  }

  getPercentageoOfDoneTasks(): number {
    return Math.round(this.getNumberOfDoneTasks() * 100 / this.getTasksViewModels().length);
  }

  getSummaryText(): string {
    const done = this.getNumberOfDoneTasks();
    if (done === 0) {
      return (
        `${this.getTasksViewModels().length} task` +
         (this.getTasksViewModels().length === 1 ? '' : 's')
      );
    }
    if (done === this.getTasksViewModels().length) {
      return 'Complete';
    }

    const percentsDone = Math.round(done * 100 / this.getTasksViewModels().length);
    return `${done} of ${this.getTasksViewModels().length} (${this.getPercentageoOfDoneTasks()}%)`;
  }

  isToday(): boolean {
    return this.viewModel.isToday();
  }

}

