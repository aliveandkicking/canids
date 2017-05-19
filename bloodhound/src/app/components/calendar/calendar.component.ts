import { Component, OnInit, Inject, Input } from '@angular/core';
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
  @Input()onDateClick: (date: Date) => void = null;
  @Input()onCheckIfDateIsSelected: (date: Date) => boolean = null;

  constructor(
    @Inject(CreateViewModelToken) private viewModel: CalendarViewModel
  ) { }

  ngOnInit() {
    this.viewModel.setOnCheckIfDateIsSelected(this.onCheckIfDateIsSelected);
    this.viewModel.setOnDateActivated(this.onDateClick);
  }

  getCurrentDates(): Date[][] {
    return this.viewModel.getCurrentDates();
  }

  getWeekDays(): number[] {
    return this.viewModel.getWeekDays();
  }

  getDayName(dayIndex: number): string {
    return this.viewModel.getDayName(dayIndex)
  }

  onNext(): void {
    this.viewModel.next();
  }

  onPrev(): void {
    this.viewModel.prev();
  }

  getMonthName(): string {
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

  onDayClick(date: Date): void {
    this.viewModel.dateActivated(date);
  }

  onMonthClick(monthNumber: number): void {
    this.viewModel.monthActivated(monthNumber);
  }

  onDayOfWeekClick(dayOfWeekNumber: number): void {
    this.viewModel.dayOfWeekActivated(dayOfWeekNumber);
  }

  getWeekDayCellClass(weekDay: number): string {
    return 'calendar-cell';
  }

  getDayCellClass(date: Date): string {
    return this.viewModel.dateIsSelected(date) ? 'calendar-cell calendar-cell-selected' : 'calendar-cell';
  }

}
