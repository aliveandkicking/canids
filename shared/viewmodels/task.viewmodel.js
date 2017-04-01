import { TaskModel } from '../models/task.model';
import { RepeatRulesModel, REPEAT_MODE } from '../models/repeat-rules.model';

export class TaskViewModel {
  constructor() {
    this._model = new TaskModel()
  }

  getTaskName() {
    return this._model.name
  }

  setTaskName(name) {
    this._model.name = name;
  }

  getStartDate() {
    return this._model.date
  }

  setStartDate(date) {
    this._model.date = date;
    if (this._model.repeatRules) {
      this._model.repeatRules.setStartDate(date)      
    }

  }

  setRepeat(repeat) {
    this._model.setRepeat(repeat)
  }

  getRepeatOptions() {
    return [
      {name: 'Do not repeat', index: null},
      {name: 'Daily', index: REPEAT_MODE.DAILY},
      {name: 'Weekly', index: REPEAT_MODE.WEEKLY},
      {name: 'Monthly', index: REPEAT_MODE.MONTHLY},
      {name: 'Yearly', index: REPEAT_MODE.YEARLY}    
  }

  

}