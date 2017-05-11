const DayTaskModel = require('./day-task.model').DayTaskModel
const TaskModel = require('./task.model').TaskModel
const dateUtils = require('../utils/dateutils').dateUtils
const serverApi = require('../server-api').serverApi

export default class DayModel {
  constructor() {
    this.dayTasks = []
    this._date = null
    this.onTaskListChangeEvents = [] // biktop is array realy needed ?
  }

  setDate(date) {
    if (!dateUtils.sameDay(date, this._date)) {
      this._date = dateUtils.clearTime(date)
      this.retrieveTasks()
    }
  }

  getDate() {
    return this._date
  }

  tasksRetrieved() {
    this.onTaskListChangeEvents.forEach((callback) => {
      if (callback) {
        callback()
      }
    })
  }

  retrieveTasks() {
    serverApi.getTasksById(this._date, (responseText) => {
      this.dayTasks = []
      let transObjs = JSON.parse(responseText)
      transObjs.forEach((obj) => {
          let task = new TaskModel()
          this.dayTasks.push(new DayTaskModel(task.loadFromTransportObject(obj)))
      });
      this.tasksRetrieved();
    })
  }
}
