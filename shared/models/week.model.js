import { BaseModel } from './base.model'

export class WeekModel extends BaseModel {
  constructor () {
      this._tasks = [[],[],[],[],[],[],[]]
      this._date = null
      this.setDate(new Date())
  }

  setDate(date) {

  }

  getDates() {
      let result = []
  }

}