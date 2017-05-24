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
  @Input() viewModel: RepeatRulesViewModel = null

  repeatModes = {}

  constructor(
    private dateHelper: DateHelperService
  ) {
    this.onCheckIfDateIsSelected = this.onCheckIfDateIsSelected.bind(this);
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

  getModeIsSelected(modeId): boolean {
    return this.viewModel.getMode() === modeId;
  }

  getDayOfWeekButtonClass(dayOfWeek: number): string[] {
    return (this.viewModel.getWeekDaysToRepeat().includes(dayOfWeek))
      ? ['selcted-mode-button']
      : []
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

  onDateInputWheel() { } // needed to swith on incr. by scroll

}
