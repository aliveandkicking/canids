import { dateUtils } from '../utils/dateutils';   

const STATITC_DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const SUNDAY = 'Su'


export class CalendarModel {
  constructor() {      
      this._mondayBased = true      
      this.dayNames = []
      this.setMondayBased(true)
  } 

  setMondayBased(mondayBased){
      this._mondayBased = mondayBased
      this.dayNames = this._mondayBased ? 
       [].concat(STATITC_DAY_NAMES, SUNDAY) :
       [].concat(SUNDAY, STATITC_DAY_NAMES)
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