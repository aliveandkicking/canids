import { dateUtils } from '../utils/dateutils';   
import { CalendarModel } from '../models/calendar.model';

const NUMBER_OF_WEEKS = 6;

export class CalendarViewModel{  
  constructor() {
    this._model = new CalendarModel();    
    this._needRecalcDates = true
    this._currentDates = null
    this._today = new Date()
    this._currentMonth = this._today.getMonth()
    this._currentYear = this._today.getFullYear()
  } 

  getCurrentDates() {
    if (this._needRecalcDates) {
      this._currentDates = this._model.getPageOfDates(this._currentYear, this._currentMonth)            
    }    
    return this._currentDates    
  }

  getCurrentMonth() {
    return this._currentMonth
  }

  setCurrentMonth() {
     this._currentMonth
  }

  getDaysNames() {
    return this._model.dayNames
  }

}