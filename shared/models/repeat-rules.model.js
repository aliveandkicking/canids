import { dateUtils } from '../utils/dateutils';

export const REPEAT_MODE = {
  NONE: 0,  
  DAILY: 1, 
  WEEKLY: 2,
  MONTHLY: 3,
  YEARLY: 4,
  ALLOWED: [0,1,2,3,4]  //biktop
};

class BaseRules {
  constructor(every = 1){
    this.every = every
  }
}

class DailyRules extends BaseRules{}

class WeeklyRules extends BaseRules{
  constructor(every = 1){
    super(every)
    this.weekDays = [];
  }
}

class MonthlyRules extends BaseRules{
  constructor(every = 1){
    super(every)
    this.dayOfTheLastWeek = false    
  }
}

class YearlyRules extends BaseRules{}

export class RepeatRulesModel {
  constructor() {
    this._mode = REPEAT_MODE.NONE;
    this.dailyRules = null       
    this.weeklyRules = null    
    this.monthlyRules = null    
    this.yearlyRules = null 

    this.lastOccurence = null   
    this.occurrences = 0
    this.occurrenecsLimit = 0
    this._startDate = null
    this._endDate = null
    this._mondayBased = true
  } 

  setMondayBased(mondayBased) {
    this._mondayBased = mondayBased
  }

  setStartDate(date) {
    this._startDate = dateUtils.clearTime(date)
  }

  setEndDate(date) {
    this._endDate = dateUtils.clearTime(date)
  }

  getEndDate(date) {
    return this._endDate
  }

  setRepeatMode(mode) {
    if (REPEAT_MODE.ALLOWED.includes(mode)) {
      this._mode = mode
      if ((this._mode == REPEAT_MODE.DAILY) && (!this.dailyRules)) {
        this.dailyRules = new DailyRules()
      } else  if ((this._mode == REPEAT_MODE.WEEKLY) && (!this.weeklyRules)) {
        this.weeklyRules = new WeeklyRules()
      } else  if ((this._mode == REPEAT_MODE.MONTHLY) && (!this.monthlyRules)) {
        this.monthlyRules = new MonthlyRules()
      } else  if ((this._mode == REPEAT_MODE.YEARLY) && (!this.yearlyRules)){
        this.yearlyRules = new YearlyRules()
      }
    }
  }

  getRepeatMode(){
    return this._mode;  
  }

  _checkDailyRules(date) {
    if (this.dailyRules) {
      let days = 
        ((date.getTime() - this._startDate.getTime()) / dateUtils.MILISECONDS_IN_DAY)
      return (days % this.dailyRules.every == 0)
    }
    return false
  }

  _getFirstDayOfWeek(date) {
    let dayOfWeek = (this._mondayBased) ? 
          dateUtils.mondayBasedDayOfWeek(date) : 
          date.getDay()
    return new Date(date.getTime() - (dateUtils.MILISECONDS_IN_DAY * dayOfWeek))
  } 

  _checkWeeklyRules(date) {
    if (this.weeklyRules) {
      let firstDayOfWeek = this._getFirstDayOfWeek(date)
      let originFirstDayOfWeek = this._getFirstDayOfWeek(this._startDate)
      let weeksPassed = 
        ((firstDayOfWeek.getTime() - originFirstDayOfWeek.getTime()) / 
        (dateUtils.MILISECONDS_IN_DAY * dateUtils.DAYS_IN_WEEK))

      if (weeksPassed % this.weeklyRules.every == 0) {        
        return this.weeklyRules.weekDays.includes(date.getDay())        
      }
    } 
    return false
  }

  _checkMonthlyRules(date) {
    if (this.monthlyRules) {
      if (this.monthlyRules.dayOfTheLastWeek) {        
        let dayOfWeek = date.getDay()
        let expectedDayOfWeek = this._startDate.getDay();
        if (dayOfWeek === expectedDayOfWeek) {
          let nextWeekDay = dateUtils.incDay(date, dateUtils.DAYS_IN_WEEK)
          return (nextWeekDay.getMonth() !== date.getMonth()) 
        }        
      } else {
        return (date.getDate() === this._startDate.getDate())
      }
    }//biktop
    return false
  } 

  _checkYearlyRules (date) {
    if (this.yearlyRules) {
      return (
        (date.getDate() === this._startDate.getDate()) &&
        (date.getMonth() === this._startDate.getMonth()) &&
        ((date.getFullYear() - this._startDate.getFullYear()) % 
          this.yearlyRules.every === 0)
      )
    }
    return false
  }

  _checkPeriod(date) {
    if (this._startDate) {
      if (date < this._startDate) {
        return false        
      }
    }
    if (this._endDate) {
      if (date > this._endDate) {
        return false        
      }
    }
    return true
  }

  containsDate(date) {
    if (!date) {
      return false
    } 
    date = dateUtils.clearTime(date)
    if (date.getTime() == this._startDate.getTime()) {
      return true      
    } else if (!this._checkPeriod(date)) {
      return false
    } else if (this._mode == REPEAT_MODE.DAILY) {
      return this._checkDailyRules(date)      
    } else  if (this._mode == REPEAT_MODE.WEEKLY) {      
      return this._checkWeeklyRules(date)
    } else  if (this._mode == REPEAT_MODE.MONTHLY) {      
      return this._checkMonthlyRules(date)
    } else  if (this._mode == REPEAT_MODE.YEARLY) {      
      return this._checkYearlyRules(date)    
    } else {
      return false
    }     
  }

}
