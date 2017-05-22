import { Component, OnInit, OnDestroy, Inject, Input, NgZone } from '@angular/core';
import { DayService } from '../../services/day.service';
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

}

