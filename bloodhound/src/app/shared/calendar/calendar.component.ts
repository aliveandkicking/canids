import { Component, OnInit, Inject, Input } from '@angular/core';
import { CreateViewModelToken, createViewModel } from '../../services/create-viewmodel.service';
import { CalendarViewModel } from '../../../../../shared/viewmodels/calendar.viewmodel';

@Component({
  selector: 'pl-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [{
      provide: CreateViewModelToken,
      useValue: createViewModel(CalendarViewModel)
  }]
})
export class CalendarComponent implements OnInit {
  @Input()dateClick: (date: Date) => void = null;
  @Input()dayOfWeekClick: (dayOfWeek: number) => void = null;
  @Input()checkIfDateIsSelected: (date: Date) => boolean = null;

  constructor(
    @Inject(CreateViewModelToken) private viewModel: CalendarViewModel
  ) { }

  ngOnInit() {
    this.viewModel.setOnCheckIfDateIsSelected(this.checkIfDateIsSelected);
    this.viewModel.setOnDateActivated(this.dateClick);
    this.viewModel.setOnDayOfWeekActivated(this.dayOfWeekClick);
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

  isCurrentMonth(date: Date): boolean {
    return this.viewModel.getCurrentMonth() === date.getMonth();
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

  getTodaysDate(): Date {
    return new Date();
  }

  goToToday(): void {
    this.viewModel.goToDate(new Date());
  }

  dateIsSelected(date: Date): boolean {
    return this.viewModel.dateIsSelected(date);
  }

}
