import {request, notification} from './messages/messages'
import Task from './task'

export default class Model {
  constructor () {
    this.taskList = []
    this.fillTemplateData()

    this.getTaskListByDate = this.getTaskListByDate.bind(this)
    this.getFullTaskList = this.getFullTaskList.bind(this)
    this.onAddDateToTask = this.onAddDateToTask.bind(this)

    request.getTaskListByDate.subscribe(this.getTaskListByDate)
    request.getFullTaskList.subscribe(this.getFullTaskList)

    notification.attempToAddDateToTask.subscribe(this.onAddDateToTask)
  }

  unInit () {
    request.getTaskListByDate.unSubscribe(this.getTaskListByDate)
    request.getFullTaskList.unSubscribe(this.getFullTaskList)

    notification.attempToAddDateToTask.unSubscribe(this.onAddDateToTask)
  }

  getTaskListByDate (data) {
    let result = []
    for (let i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].dates.containsDate(data)) {
        result.push(this.taskList[i].clone())
      }
    }
    return result
  }

  getFullTaskList () {
    let result = []
    for (let i = 0; i < this.taskList.length; i++) {
      result.push(this.taskList[i].clone())
    }
    return result
  }

  addDateToTask (taskId, date) {
    if ((!taskId) || (!date)) {
      return
    }

    let task = this.getTaskById(taskId)
    if (task) {
      if (!task.dates.containsDate(date)) {
        task.dates.addDate(date)
        notification.taskDatesChanged.send({date})
      }
    }
  }

  getTaskById (taskId) {
    for (let i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].id === taskId) {
        return this.taskList[i]
      }
    }
  }

  onAddDateToTask (data) {
    if (data) {
      this.addDateToTask(data.taskId, data.date)
    }
  }

  fillTemplateData () {
    this.taskList.push(new Task())
    this.taskList[0].dates.addDate(new Date())
    this.taskList[0].name = 'cardio'
    this.taskList[0].dates.addDate(new Date((new Date()).getTime() - 3 * 86400000))
    this.taskList[0].dates.addDate(new Date((new Date()).getTime() - 2 * 86400000))
    this.taskList[0].dates.addDate(new Date((new Date()).getTime() - 1 * 86400000))
    this.taskList[0].dates.addDate(new Date((new Date()).getTime() + 3 * 86400000))
    this.taskList[0].dates.addDate(new Date((new Date()).getTime() + 2 * 86400000))
    this.taskList[0].dates.addDate(new Date((new Date()).getTime() + 1 * 86400000))
    this.taskList[0].dates.removeDate(new Date((new Date()).getTime() - 1 * 86400000))
    this.taskList[0].dates.removeDate(new Date((new Date()).getTime() - 3 * 86400000))
    this.taskList[0].dates.removeDate(new Date((new Date()).getTime() + 4 * 86400000))
    this.taskList[0].dates.removeDate(new Date((new Date()).getTime() + 3 * 86400000))
    this.taskList[0].dates.removeDate(new Date())

    this.taskList.push(new Task())
    this.taskList[1].name = 'javascript'
    this.taskList[1].dates.addDate(new Date())
    this.taskList[1].dates.addDate(new Date((new Date()).getTime() - 86400000))

    this.taskList.push(new Task())
    this.taskList[2].name = 'prepare food'
    this.taskList[2].dates.addDate(new Date())
    this.taskList[2].dates.addDate(new Date((new Date()).getTime() - 86400000))
    this.taskList[2].dates.addDate(new Date((new Date()).getTime() - (2 * 86400000)))

    this.taskList.push(new Task())
    this.taskList[3].name = 'guitar'
    this.taskList[3].dates.addDate(new Date())
    this.taskList[3].dates.addDate(new Date((new Date()).getTime() - 86400000))
    this.taskList[3].dates.addDate(new Date((new Date()).getTime() - (2 * 86400000)))

    this.taskList.push(new Task())
    this.taskList[4].name = 'go to work'
    this.taskList[4].dates.addDate(new Date((new Date()).getTime() - 86400000))
    this.taskList[4].dates.addDate(new Date((new Date()).getTime() - (2 * 86400000)))

    this.taskList.push(new Task())
    this.taskList[5].name = 'prepare food'
    this.taskList[5].dates.addDate(new Date())
    this.taskList[5].dates.addDate(new Date((new Date()).getTime() - 86400000))
    this.taskList[5].dates.addDate(new Date((new Date()).getTime() - (2 * 86400000)))

    this.taskList.push(new Task())
    this.taskList[6].name = 'clean up'
    this.taskList[6].dates.addDate(new Date())
    this.taskList[6].dates.addDate(new Date((new Date()).getTime() - 86400000))
    this.taskList[6].dates.addDate(new Date((new Date()).getTime() - (2 * 86400000)))

    this.taskList.push(new Task())
    this.taskList[7].name = 'buy smth'
    this.taskList[7].dates.addDate(new Date())
    this.taskList[7].dates.addDate(new Date((new Date()).getTime() - 86400000))
    this.taskList[7].dates.addDate(new Date((new Date()).getTime() - (2 * 86400000)))
  }
}
