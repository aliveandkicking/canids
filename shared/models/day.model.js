import TaskModel, {tasksTemp} from './task.model'
import { dateUtils } from '../utils/dateutils';

export default class DayModel {
  constructor() {
    this.tasks = []
    this._date = null
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

  retrieveTasks() {

  }
}