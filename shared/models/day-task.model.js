import {TaskModel} from './task.model'

export class DayTaskModel {
    constructor (taskModel = new TaskModel, onStateChange = null) {
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
}
