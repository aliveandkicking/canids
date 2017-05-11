import {TaskModel} from './task.model'

export class DayTaskModel {
    constructor (taskModel = new TaskModel) {
        this.taskModel = taskModel
        this.isDone = false
    }
}
