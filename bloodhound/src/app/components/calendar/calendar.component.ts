import { Component, OnInit, Inject } from '@angular/core';
import { CreateViewModelToken, createViewModel } from '../../services/create-viewmodel.service';
import { CalendarViewModel } from '../../../../../shared/viewmodels/calendar.viewmodel';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [{ 
      provide: CreateViewModelToken,
      useValue: createViewModel(CalendarViewModel)
  }]
})
export class CalendarComponent implements OnInit {
  constructor(
    @Inject(CreateViewModelToken) private viewModel: CalendarViewModel 
  ) { }

  ngOnInit() {
  }

  getCurrentDates(): Date[][]{
    return this.viewModel.getCurrentDates() 
    }
  }