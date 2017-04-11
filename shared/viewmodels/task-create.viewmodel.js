import { TaskCreateModel } from '../models/task-create.model'
import { RepeatRulesViewModel } from './repeat-rules.viewmodel'

export class TaskCreateViewModel {
  constructor () {
    this._model = new TaskCreateModel()
    this._task = this._model.task
    this.repeatRulesViewModel = new RepeatRulesViewModel(this._task.repeatRules)
  }

  getTaskName () {
    return this._task.name
  }

  setTaskName (name) {
    this._task.name = name
  }

  getRepeatRulesViewModel () {
    return this.repeatRulesViewModel
  }

  save () {
    console.dir(JSON.stringify(this._task))
    this._model.post()
  }

  cancel () {
    console.dir(this._task)
  }

}
