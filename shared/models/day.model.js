import { TaskModel } from './task.model'
import { dateUtils } from '../utils/dateutils';
let serverApi = require('../server-api').serverApi

export default class DayModel {
  constructor() {
    this.tasks = []
    this._date = null
    this.onTaskListChangeEvents = []
  }

  setDate(date) {
    if (!dateUtils.sameDay(date, this._date)) {
      this._date = date
      this.retrieveTasks()
    }
  }

  getDate() {
    return this._date
  }

  tasksRetrieved() {
    console.dir(this.tasks)
    this.onTaskListChangeEvents.forEach((callback) => {
      callback()
    })
  }

  retrieveTasks() {
    serverApi.getTasksById(this._date, (responseText) => {
      this.tasks = []
      let transObjs = JSON.parse(responseText)
      transObjs.forEach((obj) => {
          let task = new TaskModel()
          this.tasks.push(task.loadFromTransportObject(obj))
      });
      this.tasksRetrieved();
    })
  }
}