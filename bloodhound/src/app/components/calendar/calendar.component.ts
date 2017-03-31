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
    return this.viewModel.getCurrentDates();
  }

  getWeekDays(): {index: number; name: string}[][] {
    return this.viewModel.getWeekDays();
  }

  onNext(): void {
    this.viewModel.next();
  }

  onPrev(): void {
    this.viewModel.prev();
  }

  getMonthName() {
    return this.viewModel.getCurrentMonthName();
  }

  getCurrentYear(): number {
    return this.viewModel.getCurrentYear();
  }

  showMonths(): void {
    this.viewModel.setMonthMode(true);
  }

  getMonths(): {index: number; name: string}[][] {
    return this.viewModel.getMonths();
  }

  isMonthMode(): boolean {
    return this.viewModel.isMonthMode();
  }

  onDayClick(date: Date) {
    this.viewModel.dateActivated(date);
  }

  onMonthClick(monthNumber: number) {
    this.viewModel.monthActivated(monthNumber);
  }

  onDayOfWeekClick(dayOfWeekNumber: number) {
    this.viewModel.dayOfWeekActivated(dayOfWeekNumber);
  }

  dateIsSelected(date) {
    return this.viewModel.dateIsSelected(date);
  }

  getCellClass(date): string {
    return this.viewModel.dateIsSelected(date) ? 'calendar-cell calendar-cell-selected' : 'calendar-cell';
  }

}
