import { dateUtils } from '../utils/dateutils';   

const STATITC_DAY_NAMES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const SUNDAY = 'Su'

export class CalendarModel {
  constructor() {      
      this._mondayBased = null
      this.dayNames = null
      this.setMondayBased(true)
      this.numberOfWeeksOnPage = 6
  } 

  setMondayBased(mondayBased){
      this._mondayBased = mondayBased
      this.dayNames = this._mondayBased ? 
       [].concat(STATITC_DAY_NAMES, SUNDAY) :
       [].concat(SUNDAY, STATITC_DAY_NAMES)
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

  getPageOfDates(year, month) {    
    let monthStart = this.getLastWeekStart(year, month)
    let result = []
    let week = []
    let date;
    for (let i = 0; i < this.numberOfWeeksOnPage; i++) {      
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

}