import { Component, OnInit, Input } from '@angular/core';
import { CreateViewModelToken, createViewModel } from '../../services/create-viewmodel.service';
import { DateHelperService } from "../../services/date-helper.service";
import { RepeatRulesViewModel } from '../../../../../shared/viewmodels/repeat-rules.viewmodel';


@Component({
  selector: 'repeat-rules',
  templateUrl: './repeat-rules.component.html',
  styleUrls: ['./repeat-rules.component.css']
})
export class RepeatRulesComponent implements OnInit {
  @Input() viewModel: RepeatRulesViewModel = null;

  repeatModes = {}

  constructor(
    private dateHelper: DateHelperService
  ) {
    this.onCheckIfDateIsSelected = this.onCheckIfDateIsSelected.bind(this);
    this.onCalendarDayOfWeekClick = this.onCalendarDayOfWeekClick.bind(this);
    this.onCalendarDateClick = this.onCalendarDateClick.bind(this);
  }

  ngOnInit() {
    for (let mode of this.viewModel.getRepeatModeList()) {
      this.repeatModes[mode.name] = mode.id
    }
  }

  getRepeatModeList(): {id: number, name: string}[] {
    return this.viewModel.getRepeatModeList()
  }

  onModeSelected(modeId: number): void {
    if (this.viewModel.getMode() !== modeId) {
      this.viewModel.setMode(modeId)
    }
  }

  modeIsSelected(modeId): boolean {
    return this.viewModel.getMode() === modeId;
  }

  weekDayIsSelected(weekDay: number): boolean {
    return this.viewModel.getWeekDaysToRepeat().includes(weekDay);
  }

  onCheckIfDateIsSelected(date: Date): boolean {
    if (this.viewModel) {
      return this.viewModel.containsDate(date)
    }
  };

  isLayoutVisible(mode) {
    return ((mode || (mode === 0)) ? (mode === this.viewModel.getMode()) : false)
  }

  getRepeatEvery(): number {
    return this.viewModel.getRepeatEvery()
  }

  getDaysOfWeek() {
    return this.viewModel.getWeekDays();
  }

  getDayName(index: number): string {
    return this.dateHelper.utils.DAY_NAMES[index];
  }

  onDayOfWeekClick(dayOfWeek: number): void {
    this.viewModel.changeWeekDayToRepeat(dayOfWeek)
  }

  getUseDayOfTheLastWeek(): boolean {
    return this.viewModel.getUseDayOfTheLastWeek();
  }

  setUseDayOfTheLastWeek(useDayOfTheLastWeek: boolean): void {
    this.viewModel.setUseDayOfTheLastWeek(useDayOfTheLastWeek)
  }

  setRepeatEvery(repeatEvery): void {
    this.viewModel.setRepeatEvery(repeatEvery)
  }

  getStartDate(): Date {
    return this.viewModel.getStartDate()
  }

  setStartDate(date: Date): void {
    this.viewModel.setStartDate(date)
  }

  getEndDate(): Date {
    return this.viewModel.getEndDate();
  }

  setEndDate(date: Date): void {
    this.viewModel.setEndDate(date)
  }

  getDateFormat(): string {
    return this.dateHelper.DATE_FORMAT;
  }

  getNeverEnd(): boolean {
    return this.viewModel.getNeverEnd()
  }

  setNeverEnd(checked: boolean): void {
    this.viewModel.setNeverEnd(checked)
  }

  onDateInputWheel() { } // needed to switch on incr. by scroll

  onCalendarDateClick (date: Date) {
    this.viewModel.selectDate(date);
  }

  onCalendarDayOfWeekClick (dayOfWeek: number) {
    this.viewModel.selectDayOfWeek(dayOfWeek);
  }

}
