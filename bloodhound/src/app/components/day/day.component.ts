import { Component, OnInit, OnDestroy, Inject, Input, NgZone } from '@angular/core';
import { DayService } from '../../services/day.service';
import { DayViewModel } from '../../../../../shared/viewmodels/day.viewmodel';

@Component({
  selector: 'pl-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit, OnDestroy {
  @Input() viewModel: DayViewModel = null;
  loaded = false;

  constructor(
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.viewModel.subscribeForTaskListChange(() => {
      this.loaded = true;
      this.zone.run(() => {}); // biktop. investigate
    });
  }

  ngOnDestroy() {
    this.viewModel.finalize();
  }

  getDate () {
    return this.viewModel.getDate();
  }

  getTasks(): string[] {
    const names = this.viewModel.getTasksNames();
    console.log('names', names);
    return names;
  }

}

