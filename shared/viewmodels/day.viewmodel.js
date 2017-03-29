import DayModel from '../models/day.model';

export class DayViewModel{  
  constructor() {
    this.day = new DayModel()    
  }

  getTasks() {
    return this.day.tasks
  }

}