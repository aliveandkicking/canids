import DayModel from '../models/day.model';

export class DayViewModel{
  constructor() {
    this._model = new DayModel()
  }

  setDate(date) {
    this._model.setDate(date)
  }

  getDate() {
    return this._model.getDate()
  }

  getTasksNames() {
    return this._model.tasks.map((el) => el.name)
  }

  finalize() {
    this._model.onTaskListChangeEvents = [] // biktop
  }

  subscribeForTaskListChange(callback) {
    this._model.onTaskListChangeEvents.push(callback)
  }
}