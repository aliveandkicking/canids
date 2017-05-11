import DayModel from '../models/day.model';
import { DayTaskViewModel } from './day-task.viewmodel';

export class DayViewModel{
  constructor() {
    this._model = new DayModel()
    this.dayTasksViewModels = []
    this.onTaskListChange = null
    this._model.onTaskListChangeEvents.push(() => this.initTaskViewModels())
  }

  setDate(date) {
    this._model.setDate(date)
  }

  getDate() {
    return this._model.getDate()
  }

  initTaskViewModels() {
    this.dayTasksViewModels = this._model.dayTasks.map(dayTask => new DayTaskViewModel(dayTask))
    if (this.onTaskListChange) {
      this.onTaskListChange()
    }
  }

  getDayTasksViewModels() {
    return this.dayTasksViewModels
  }

  finalize() {
    this.onTaskListChange = null
  }

  setOnTaskListChange(callback) {
    this.onTaskListChange = callback
  }
}
