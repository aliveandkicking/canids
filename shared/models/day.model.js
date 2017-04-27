import TaskModel, {tasksTemp} from './task.model'

export default class DayModel {
  constructor() {
    this.tasks = []
  }

  setDate(date) {
    if (!date) { 
      return
    }

    this.retrieveTasks();
  }

  retrieveTasks() {
    this.tasks = tasksTemp;
  }

}