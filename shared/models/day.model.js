const DayTaskModel = require('./day-task.model').DayTaskModel
const TaskModel = require('./task.model').TaskModel
const dateUtils = require('../utils/dateutils').dateUtils
const serverApi = require('../server-api').serverApi

class DayModel {
  constructor () {
    this.dayTasks = []
    this._date = null
    this.afterTaskListChange = null
    this.loadOnChanges = true
  }

  setDate (date) {
    if (!dateUtils.sameDay(date, this._date)) {
      this._date = dateUtils.clearTime(date)
      if (this.loadOnChanges) {
        this.load()
      }
    }
  }

  getDate () {
    return this._date
  }

  isToday () {
    return dateUtils.isToday(this._date)
  }

  loaded () {
    if (this.afterTaskListChange) {
      this.afterTaskListChange()
    }
  }

  save () {
    let doneTaskIds = []
    this.dayTasks.forEach(dayTask => {
      if (dayTask.getIsDone()) {
        doneTaskIds.push(dayTask.taskModel.id)
      }
    })
    let id = dateUtils.toString(this.getDate())
    serverApi.save({id: id, entity: this.constructor.name, doneTaskIds})
  }

  load () {
    serverApi.getTasksByDate(this._date).then(transObjs => {
      const dateStr = dateUtils.toString(this.getDate())
      console.log('transObjs: ', transObjs)
      const currentDateInfo = transObjs.find(obj => {
        return obj.data.date === dateStr
      })
      this.loadFromTransportObject(currentDateInfo)
    })
  }

  loadFromTransportObject (transportObject) {
    this.dayTasks = []
    transportObject.data.tasks.forEach(taskInfo => {
      let dayTask = new DayTaskModel(
        (new TaskModel()).loadFromTransportObject(taskInfo.task), () => {
          this.save()
        }
      )
      dayTask._isDone = taskInfo.isDone
      this.dayTasks.push(dayTask)
    })
    this.loaded()
  }
}

module.exports.DayModel = DayModel
