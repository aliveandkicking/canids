import { Component, OnInit, Inject } from '@angular/core';
import { CreateViewModelToken, createViewModel } from '../../services/create-viewmodel.service';
import { WeekViewModel } from '../../../../../shared/viewmodels/week.viewmodel';
import { DayViewModel } from '../../../../../shared/viewmodels/day.viewmodel';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css'],
  providers: [{
      provide: CreateViewModelToken,
      useValue: createViewModel(WeekViewModel)
  }]
})
export class WeekComponent implements OnInit {

  constructor(
    @Inject(CreateViewModelToken) private viewModel: WeekViewModel
  ) { }

  ngOnInit() {

  }

  getDates(): Date[] {
    return this.viewModel.getDates();
  }

  getDayViewModel(date): DayViewModel {
    return this.viewModel.getDayViewModel(date);
  }

  next(): void {
    this.viewModel.next();
  }

  prev(): void {
    this.viewModel.prev();
  }

  today(): void {
    this.viewModel.today();
  }

  getCaption(): string {
    return this.viewModel.getCaption();
  }

}
