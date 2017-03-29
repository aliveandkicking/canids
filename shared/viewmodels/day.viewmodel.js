import DayModel from '../models/day.model';

export class DayViewModel{  
  constructor() {
    this.day = new DayModel()    
  }

  getTasksIds() {    
    return this.day.tasks.map(task => task.id)  
  }

  getTaskNameById(id) {
    if (!id) {
      return
    }

    for (let i = 0; i < this.day.tasks.length; i++) {
      if (this.day.tasks[i].id === id)
        return this.day.tasks[i].name
    }
  }

  setDate(date) {
    this.day.setDate(date)
  }

}