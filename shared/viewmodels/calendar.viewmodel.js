import { dateUtils } from '../utils/dateutils';
import { CalendarModel } from '../models/calendar.model';

export class CalendarViewModel {
  constructor () {
    this._model = new CalendarModel()
    this._needRecalcDates = true
    this._currentDates = null
    this._today = new Date()
    this._currentMonth = this._today.getMonth()
    this._currentYear = this._today.getFullYear()
    this._isMonthMode = false
    this._numberOfWeeksOnPage = 6
    this._numberOfMonthColumnsOnPage = 4

    this._onCheckIfDateIsSelected = null
    this._onDateActivated = null
    this._onDayOfWeekActivated = null
  }

  getCurrentYear () {
    return this._currentYear
  }

  getCurrentDates () {
    if (this._needRecalcDates) {
      this._currentDates = this._model.getDates(this._currentYear, this._currentMonth, this._numberOfWeeksOnPage)
    }
    return this._currentDates
  }

  setMonthMode (isMonthMode) {
    this._isMonthMode = isMonthMode
  }

  isMonthMode () {
    return this._isMonthMode
  }

  getCurrentMonth () {
    return this._currentMonth
  }

  setCurrentMonth (month) {
    if ((!month) && (month !== 0)) {
      return
    }

    if (month > dateUtils.DECEMBER_INDEX) {
      this._currentMonth = dateUtils.DECEMBER_INDEX
    } else if (month < dateUtils.JANUARY_INDEX) {
      this._currentMonth = dateUtils.JANUARY_INDEX
    } else {
      this._currentMonth = month
    }
    this._needRecalcDates = true
  }

  getCurrentMonthName () {
    return dateUtils.MONTH_NAMES[this._currentMonth]
  }

  getMonths () {
    let result = []
    let row = []
    for (let i = 0; i < dateUtils.MONTH_NAMES_SHORT.length; i++) {
      let month = { index: i, name: dateUtils.MONTH_NAMES_SHORT[i] }

      row.push(month)
      if ((i > 0) && ((i + 1) % this._numberOfMonthColumnsOnPage === 0)) {
        result.push(row)
        row = []
      }
    }
    if (row.length > 0) {
      result.push(row)
    }
    return result
  }

  getWeekDays () {
    return this._model.getWeekDays()
  }

  getDayName (dayIndex) {
    return this._model.getDayName(dayIndex)
  }

  next () {
    if (this._isMonthMode) {
      this._currentYear++
    } else {
      let { month, year } = this._model.incMonth(this._currentMonth, this._currentYear)
      this._currentMonth = month
      this._currentYear = year
    }
    this._needRecalcDates = true
  }

  prev () {
    if (this._isMonthMode) {
      this._currentYear--
    } else {
      let { month, year } = this._model.decMonth(this._currentMonth, this._currentYear)
      this._currentMonth = month
      this._currentYear = year
    }
    this._needRecalcDates = true
  }

  dateActivated (date) {
    if (this._onDateActivated) {
      this._onDateActivated(date)
    }
  }

  dayOfWeekActivated (dayOfWeek) {
    if (this._onDayOfWeekActivated) {
      this._onDayOfWeekActivated(dayOfWeek)
    }
  }

  dateIsSelected (date) {
    return (
      this._onCheckIfDateIsSelected ? this._onCheckIfDateIsSelected(date) : false)
  }

  monthActivated (month) {
    this.setCurrentMonth(month)
    this.setMonthMode(false)
  }

  setOnCheckIfDateIsSelected (event) {
    this._onCheckIfDateIsSelected = event
  }

  setOnDateActivated (event) {
    this._onDateActivated = event
  }

  setOnDayOfWeekActivated (event) {
    this._onDayOfWeekActivated = event
  }

  goToDate (date) {
    if (date) {
      this._currentMonth = date.getMonth()
      this._currentYear = date.getFullYear()
      this._needRecalcDates = true
    }
  }

}
