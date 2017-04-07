import { RepeatRulesModel, REPEAT_MODE } from '../models/repeat-rules.model';

export class RepeatRulesViewModel {
  constructor(repeatRulesModel) {
    this._model = repeatRulesModel
  }

  getMode() {
    return this._model.getRepeatMode()   
  }

  setMode(repeatMode) {
    this._model.setRepeatMode(repeatMode)    
  } 

  getRepeatModeList() {
    return([      
      {id: REPEAT_MODE.DAILY, name: 'Daily'},
      {id: REPEAT_MODE.WEEKLY, name: 'Weekly'},
      {id: REPEAT_MODE.MONTHLY, name: 'Monthly'},
      {id: REPEAT_MODE.YEARLY, name: 'Yearly'}
    ])
  }

  _getCurrentModelMode() {
    let mode = this._model.getRepeatMode()
    if (mode == REPEAT_MODE.DAILY) {
      return this._model.dailyRules
    } else  if (mode == REPEAT_MODE.WEEKLY) {
      return this._model.weeklyRules
    } else  if (mode == REPEAT_MODE.MONTHLY) {
      return this._model.monthlyRules
    } else  if (mode == REPEAT_MODE.YEARLY) {
      return this._model.yearlyRules
    }   
  }

  getRepeatEvery() {
    return this._getCurrentModelMode().every     
  } 

  setRepeatEvery(repeatEvery) {
    this._getCurrentModelMode().every = repeatEvery      
  } 

  getOccurrenecsLimit() {
    return this._model.occurrenecsLimit
  }

  setOccurrenecsLimit(limit) {
    this._model.occurrenecsLimit = limit
  }

  getEndDate() {
    return this._model.getEndDate()
  }

  setEndDate(date) {
    this._model.setEndDate(date)
  }

  setStartDate(date) {
    this._model.setStartDate(date)
  }

  getWeekDaysToRepeat() {    
    if (this._model.getRepeatMode() === REPEAT_MODE.WEEKLY) {
      if (this._model.weeklyRules) {
        return [].concat(this._model.weeklyRules.weekDays)        
      }
    }
    return []    
  }

  setWeekDaysToRepeat(weekDays){    
    if (this._model.getRepeatMode() === REPEAT_MODE.WEEKLY) {
      if ((this._model.weeklyRules) && (weekDays)) {
        this._model.weeklyRules.weekDays = [].concat(weekDays)
      }
    }
  }

  getUseDayOfTheLastWeek() {
    if (this._model.getRepeatMode() === REPEAT_MODE.MONTHLY) {
      if (this._model.monthlyRules) {
        return this._model.monthlyRules.dayOfTheLastWeek        
      }
    }
    return false      
  }

  setUseDayOfTheLastWeek(useDayOfTheLastWeek) {
    if (this._model.getRepeatMode() === REPEAT_MODE.MONTHLY) {
      if (this._model.monthlyRules) {
       this._model.monthlyRules.dayOfTheLastWeek = useDayOfTheLastWeek        
      }
    }  
  }

  containsDate(date) {
    return this._model.containsDate(date)
  }

}
