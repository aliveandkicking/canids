import { TaskModel } from '../models/task.model';
import { RepeatRulesViewModel } from './repeat-rules.viewmodel'

export class TaskCreateViewModel {
  constructor () {
    this._model = new TaskModel()
    this.repeatRulesViewModel = new RepeatRulesViewModel(this._model.repeatRules)
  }

  getTaskName () {
    return this._model.name
  }

  setTaskName (name) {
    this._model.name = name
  }

  getRepeatRulesViewModel () {
    return this.repeatRulesViewModel
  }

  save () {
    this._model.save()
  }

  cancel () {
    console.dir(this._model)
  }

}
