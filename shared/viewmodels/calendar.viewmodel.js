import { dateUtils } from '../utils/dateutils';   

const NUMBER_OF_WEEKS = 6;

export class CalendarViewModel{  
  constructor() {
    this.today = new Date()
    this.currentMonth = this.today.getMonth()
    this.currentYear = this.today.getFullYear()

    this._needRecalcDates = true
    this._currentDates = null
  } 

  getStartDate() {
    let result = new Date(this.currentYear, this.currentMonth, 0)
    let dayOfWeek = dateUtils.mondayBasedDayOfWeek(result)

    if (dayOfWeek > 0) {
      result = new Date(
        result.getTime() - (dateUtils.MILISECONDS_IN_DAY * dayOfWeek)
      )
    }
    return result
  }

  calculateCurrentDates() {
    if (!this._needRecalcDates) {
      return
    }

    this._currentDates = []
    let monthStart = this.getStartDate()  
    let date    
    for (let i = 0; i < NUMBER_OF_WEEKS; i++) {
      let week = []
      for (let j = 0; i < dateUtils.DAYS_IN_WEEK; j++) {
        date = new Date(
          monthStart.getTime() + 
          (((i * dateUtils.DAYS_IN_WEEK) + j) * dateUtils.MILISECONDS_IN_DAY))
        week.push(date)        
      }      
      this._currentDates.push(week)
    }
    this._needRecalcDates = false
  } 

  getCurrentDates() {
    this.calculateCurrentDates()
    return this._currentDates    
  }

  getCurrentMonth() {

  }

}