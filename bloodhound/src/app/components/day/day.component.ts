import { Component, OnInit } from '@angular/core';
import { DayService } from '../../services/day.service';
import { DayViewModel } from '../../../../../shared/viewmodels/day.viewmodel';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  providers: [DayService]
})
export class DayComponent implements OnInit {
  private viewModel: DayViewModel = null;

  constructor(
    private dayService: DayService
  ) { }

  ngOnInit() {
    this.viewModel = this.dayService.getViewModel();
    this.viewModel.setDate(new Date());
  }

  getTasksIds() {
    return this.viewModel.getTasksIds()
  }

  getTaskNameById(id: number): string {
    return this.viewModel.getTaskNameById(id)
  }

}
