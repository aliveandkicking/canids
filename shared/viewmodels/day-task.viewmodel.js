export class DayTaskViewModel {
  constructor (dayTaskModel) {
    this._model = dayTaskModel
    this.showFullInfo = false
  }

  getTaskName () {
    return this._model.taskModel.name
  }

  getIsDone () {
    return this._model.getIsDone()
  }

  setIsDone (isDone) {
    this._model.setIsDone(isDone)
  }

  setShowFullInfo (showFullInfo) {
    this.showFullInfo = showFullInfo
  }

  getShowFullInfo () {
    return this.showFullInfo
  }

  getTaskColor () {
    return this._model.getTaskColor()
  }

  getTaskNameAbbreviation () {
    return this._model.getTaskNameAbbreviation()
  }
}
