import { TaskCreateModel } from '../models/task-create.model';
import { RepeatRulesViewModel } from './repeat-rules.viewmodel';

export class TaskCreateViewModel {
  constructor () {
    this._model = new TaskCreateModel()   
    this.task = this._model.task;
    this.repeatRulesViewModel = new RepeatRulesViewModel(this.task.repeatRules)
  }

  setRepeat(repeatMode) {
    return this.task.repeatRules.setRepeatMode(repeatMode)
  }  

  getRepeat() {
    return this.task.repeatRules.getRepeatMode() !== 0
  }

  getRepeatRulesViewModel() {
    return this.repeatRulesViewModel
  }

}