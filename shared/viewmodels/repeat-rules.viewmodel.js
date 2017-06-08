import { REPEAT_MODE } from '../models/repeat-rules.model'
import { dateUtils } from '../utils/dateutils'

export class RepeatRulesViewModel {
  constructor (repeatRulesModel) {
    this._model = repeatRulesModel
    this.mondayBased = true
  }

  getMode () {
    return this._model.getRepeatMode()
  }

  setMode (repeatMode) {
    this._model.setRepeatMode(repeatMode)
  }

  getRepeatModeList () {
    return ([
      {id: REPEAT_MODE.ONCE, name: 'once', title: 'Once'},
      {id: REPEAT_MODE.DAILY, name: 'daily', title: 'Daily'},
      {id: REPEAT_MODE.WEEKLY, name: 'weekly', title: 'Weekly'},
      {id: REPEAT_MODE.MONTHLY, name: 'monthly', title: 'Monthly'},
      {id: REPEAT_MODE.YEARLY, name: 'yearly', title: 'Yearly'}
    ])
  }

  _getCurrentModelMode () {
    let mode = this._model.getRepeatMode()
    if (mode === REPEAT_MODE.DAILY) {
      return this._model.dailyRules
    } else if (mode === REPEAT_MODE.WEEKLY) {
      return this._model.weeklyRules
    } else if (mode === REPEAT_MODE.MONTHLY) {
      return this._model.monthlyRules
    } else if (mode === REPEAT_MODE.YEARLY) {
      return this._model.yearlyRules
    }
  }

  getRepeatEvery () {
    return this._getCurrentModelMode().every
  }

  setRepeatEvery (repeatEvery) {
    this._getCurrentModelMode().every = repeatEvery
  }

  getStartDate () {
    return this._model.getStartDate()
  }

  setStartDate (date) {
    this._model.setStartDate(date)
  }

  getEndDate () {
    return this._model.getEndDate()
  }

  setEndDate (date) {
    this._model.setEndDate(date)
  }

  getNeverEnd () {
    return this._model.neverEnd
  }

  setNeverEnd (neverEnd) {
    this._model.neverEnd = neverEnd
  }

  getWeekDays () {
    return this.mondayBased
      ? dateUtils.DAYS_OF_WEEK_MONDAY_BASED
      : dateUtils.DAYS_OF_WEEK
  }

  getWeekDaysToRepeat () {
    if (this._model.getRepeatMode() === REPEAT_MODE.WEEKLY) {
      if (this._model.weeklyRules) {
        return [].concat(this._model.weeklyRules.weekDays)
      }
    }
    return []
  }

  setWeekDaysToRepeat (weekDays) {
    if (this._model.getRepeatMode() === REPEAT_MODE.WEEKLY) {
      if ((this._model.weeklyRules) && (weekDays)) {
        this._model.weeklyRules.weekDays = [].concat(weekDays)
      }
    }
  }

  changeWeekDayToRepeat (weekDay) {
    if (this._model.getRepeatMode() === REPEAT_MODE.WEEKLY) {
      this._model.changeWeekDayToRepeat(weekDay)
    }
  }

  getUseDayOfTheLastWeek () {
    if (this._model.getRepeatMode() === REPEAT_MODE.MONTHLY) {
      if (this._model.monthlyRules) {
        return this._model.monthlyRules.dayOfTheLastWeek
      }
    }
    return false
  }

  setUseDayOfTheLastWeek (useDayOfTheLastWeek) {
    if (this._model.getRepeatMode() === REPEAT_MODE.MONTHLY) {
      if (this._model.monthlyRules) {
        this._model.monthlyRules.dayOfTheLastWeek = useDayOfTheLastWeek
      }
    }
  }

  containsDate (date) {
    return this._model.containsDate(date)
  }

  _changeCloseEdgeDate (date) {
    if (!this.getNeverEnd()) {
      if (Math.abs(date.getTime() - this.getEndDate().getTime()) <
          Math.abs(date.getTime() - this.getStartDate().getTime())) {
        this.setEndDate(date)
        return
      }
    }
    this.setStartDate(date)
  }

  selectDayOfWeek (dayOfWeek) {
    if (this._model.getRepeatMode() === REPEAT_MODE.WEEKLY) {
      this.changeWeekDayToRepeat(dayOfWeek)
    } else {
      this._changeCloseEdgeDate(
        dateUtils.incDay(dateUtils.getStartOfWeek(this._model.getStartDate()),
          dateUtils.mondayBasedDayOfWeekIdx(dayOfWeek)))
    }
  }

  selectDate (date) {
    if (date) {
      this._changeCloseEdgeDate(date)
    }
  }

}
