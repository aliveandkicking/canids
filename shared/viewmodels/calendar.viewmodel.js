import { dateUtils } from '../utils/dateutils';   
import { CalendarModel } from '../models/calendar.model';

export class CalendarViewModel{  
  constructor() {
    this._model = new CalendarModel();    
    this._needRecalcDates = true
    this._currentDates = null
    this._today = new Date()
    this._currentMonth = this._today.getMonth()
    this._currentYear = this._today.getFullYear()
    this._isMonthMode = false
    this._numberOfWeeksOnPage = 6
    this._numberOfMonthColumnsOnPage = 4

    this._selectedDates = []
    this._selectedWeekDays = []
  } 

  getCurrentYear() {
    return this._currentYear;
  }

  getCurrentDates() {
    if (this._needRecalcDates) {
      this._currentDates = this._model.getDates(this._currentYear, this._currentMonth, this._numberOfWeeksOnPage)            
    }    
    return this._currentDates    
  }

  setMonthMode(isMonthMode){
    this._isMonthMode = isMonthMode
  }

  isMonthMode() {
    return this._isMonthMode;
  }

  getCurrentMonth() {
    return this._currentMonth
  }

  setCurrentMonth(month) {
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

  getCurrentMonthName() {
    return dateUtils.MONTH_NAMES[this._currentMonth]
  }

  getMonths() {
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

  getWeekDays() {
    let result = [] 
    this._model.dayNames.forEach((name, index) => result.push({index, name}))
    return result
  }

  next() {
    if (this._isMonthMode) {
      this._currentYear++            
    } else {
      let { month, year } = this._model.incMonth(this._currentMonth, this._currentYear)    
      this._currentMonth = month
      this._currentYear = year
    }  
    this._needRecalcDates = true
  }

  prev() {
    if (this._isMonthMode) {
      this._currentYear--            
    } else {
      let { month, year } = this._model.decMonth(this._currentMonth, this._currentYear)    
      this._currentMonth = month
      this._currentYear = year
    }  
    this._needRecalcDates = true
  }

  dateActivated(date) {    
    if (!date) {
      return
    }

    const index = this._selectedDates.indexOf(date.getTime())
    if (index >= 0) {
      this._selectedDates.splice(index, 1)      
    } else {
      this._selectedDates.push(date.getTime())
    }
  }

  dateIsSelected(date) {    
    return( 
      (this._selectedDates.indexOf(date.getTime()) >= 0) || 
      (this.weekDayIsSelected(this._model.getWeekDayIndex(date.getDay())) >= 0)
    )
  }

  weekDayIsSelected(weekDay) {
    return this._selectedWeekDays.indexOf(weekDay) >= 0
  }

  monthActivated(month) {
    this.setCurrentMonth(month)
    this.setMonthMode(false)
  }

  dayOfWeekActivated(dayOfWeek) {
    if (((!dayOfWeek) && (dayOfWeek != 0)) || 
        (dayOfWeek >= dateUtils.DAYS_IN_WEEK)) {
      return
    }     
    const index = this._selectedWeekDays.indexOf(dayOfWeek)
    if (index >= 0) {
      this._selectedWeekDays.splice(index, 1)      
    } else {
      this._selectedWeekDays.push(dayOfWeek)
    }
  }

}