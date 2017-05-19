import { dateUtils } from '../utils/dateutils';

export class CalendarModel {
  constructor() {
      this._mondayBased = true
      this.setMondayBased(true)
  }

  getDayNames () {
    // return this._mondayBased ? dateUtils.DAYS_OF_WEEK_MONDAY_BASED.map((el))



    // this._model.dayNames.forEach((name, index) => result.push({index, name}))
    // return result

  }

  setMondayBased(mondayBased){
      this._mondayBased = mondayBased
  }

  getWeekDayIndex (weekDay) {
    return this._mondayBased ? dateUtils.mondayBasedDayOfWeekIdx(weekDay) : weekDay
  }

  getLastWeekStart (year, month) {
    let monthStart = new Date(year, month, 0)
    let dayOfWeek = this._mondayBased ? dateUtils.mondayBasedDayOfWeek(monthStart) : monthStart.getDay()
    return dateUtils.decDay(monthStart, dayOfWeek)
  }

  getDates (year, month, numberOfWeeks) {
    let monthStart = this.getLastWeekStart(year, month)
    let result = []
    let week = []
    for (let i = 0; i < numberOfWeeks; i++) {
      for (let j = 0; j < dateUtils.DAYS_OF_WEEK.length; j++) {
        week.push(dateUtils.incDay(monthStart, (i * dateUtils.DAYS_OF_WEEK.length) + j))
      }
      result.push(week)
      week = []
    }
    return result
  }

  incMonth (month, year) {
    if ((month) || (month === 0)) {
      if (month === dateUtils.DEC) {
        month = dateUtils.JAN
        if (year) {
          year++
        }
      } else {
        month++
      }
    }
    return { month, year }
  }

  decMonth (month, year) {
    if ((month) || (month === 0)) {
      if (month === dateUtils.JAN) {
        month = dateUtils.DEC
        if (year) {
          year--
        }
      } else {
        month--
      }
    }
    return { month, year }
  }

}