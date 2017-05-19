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
      this.load()
    }
  }

  getDate() {
    return this._date
  }

  loaded() {
    this.onTaskListChangeEvents.forEach((callback) => {
      if (callback) {
        callback()
      }
    })
  }

  retrieveTasks(callback) {
    serverApi.getTasksByDate(this._date).
      then((transObjs) => {
        this.dayTasks = []
        transObjs.forEach((obj) => {
          let task = new TaskModel()
          this.dayTasks.push(new DayTaskModel(task.loadFromTransportObject(obj), () => {
            this.save()
          }))
      })
      callback()
    })
  }

  save() {
    let tasks = []
    this.dayTasks.forEach(dayTask => {
      tasks.push({ taskId: dayTask.taskModel.id, isDone: dayTask.getIsDone() ? 1 : 0 })
    })
    let id = dateUtils.toString(this.getDate())
    serverApi.save({id: id, entity: this.constructor.name, tasks: tasks})
  }

  load() {
    this.retrieveTasks(() => {
      let id = dateUtils.toString(this.getDate())

      let transObj = {id: null, entity: this.constructor.name, tasks: []}
      serverApi.load(this.constructor.name, id, transObj).
        then(() => {
          this.dayTasks.forEach(dayTask => {
            // biktop
            let isDone = transObj.tasks.findIndex((task) => {
              return ((task.taskId === dayTask.taskModel.id) && (task.isDone))}) >= 0
            dayTask._isDone = isDone
          })
        this.loaded()
      })
    })
  }
}
