import DayModel from '../models/day.model';

export class DayViewModel{
  constructor() {
    this._model = new DayModel()
  }

  setDate(date) {
    this._model.setDate(date)
  }

  getDate() {
    return this._model.getDate()
  }

}