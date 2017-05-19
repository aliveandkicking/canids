export class DayTaskViewModel {
  constructor (dayTaskModel) {
    this._model = dayTaskModel
  }

  getTaskName () {
    return this._model.taskModel.name
  }

  getIsDone() {
      return this._model.getIsDone()
  }

  setIsDone(isDone) {
      this._model.setIsDone(isDone)
  }
}
