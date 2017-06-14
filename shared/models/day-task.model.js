import { TaskModel } from './task.model'
import { stringToColor } from '../utils/string-to-color'

export class DayTaskModel {
  constructor (taskModel = new TaskModel(), onStateChange = null) {
    this.taskModel = taskModel
    this._isDone = false
    this.onStateChange = onStateChange
  }

  setIsDone (isDone) {
    this._isDone = isDone
    if (this.onStateChange) {
      this.onStateChange()
    }
  }

  getIsDone (isDone) {
    return this._isDone
  }

  getTaskColor () {
    return stringToColor.getColor(this.taskModel.name)
  }

  getTaskNameAbbreviation () {
    const name = this.taskModel.name
    let result = ''

    let words = name.split(' ')
    if (words.length === 1) {
      words = name.split('.')
    }

    if (words.length > 1) {
      for (let i = 0; (i < words.length) && (i < 3); i++) {
        if (words[i]) {
          result += (result ? '.' : '') + words[i].charAt(0)
        }
      }
      if (result) {
        return result.toUpperCase()
      }
    }

    result = name.charAt(0).toUpperCase()
    if (name.length > 1) {
      result += name.charAt(1)
    }
    return result
  }
}
