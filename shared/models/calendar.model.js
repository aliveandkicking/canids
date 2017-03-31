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

  getWeekDayIndex(weekDay) {
    return this._mondayBased ? dateUtils.mondayBasedDayOfWeekIdx(weekDay) : weekDay      
  }

  getLastWeekStart(year, month) {
    let result = new Date(year, month, 0)

    let dayOfWeek = this._mondayBased ? dateUtils.mondayBasedDayOfWeek(result) : result.getDay()

    if (dayOfWeek > 0) {
      result = new Date(
        result.getTime() - (dateUtils.MILISECONDS_IN_DAY * dayOfWeek)
      )
    }
    return result
  }

  getDates(year, month, numberOfWeeks) {    
    let monthStart = this.getLastWeekStart(year, month)
    let result = []
    let week = []
    let date;
    for (let i = 0; i < numberOfWeeks; i++) {      
      for (let j = 0; j < dateUtils.DAYS_IN_WEEK; j++) {
        date = new Date(
          monthStart.getTime() + 
          (((i * dateUtils.DAYS_IN_WEEK) + j) * dateUtils.MILISECONDS_IN_DAY))
        week.push(date)              
      }      
      result.push(week)
      week = []  
    }
    return result
  } 

  incMonth(month, year) {
    if ((month) || (month === 0)) {
      if (month === dateUtils.DECEMBER_INDEX) {
        month = dateUtils.JANUARY_INDEX      
        if (year) {
          year++
        }
      } else {
        month++
      }       
    }
    return { month, year }
  }

  decMonth(month, year) {
    if ((month) || (month === 0)) {
      if (month === dateUtils.JANUARY_INDEX) {
        month = dateUtils.DECEMBER_INDEX      
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