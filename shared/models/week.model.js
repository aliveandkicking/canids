import { BaseModel } from './base.model'
import { dateUtils } from '../utils/dateutils';


export class WeekModel extends BaseModel {
  constructor () {
      super()
    //   this.days =
      this._date = null
      this.setDate(new Date())
      this.mondayBased = true
  }

  setDate(date) {
      this._date = dateUtils.getStartOfWeek(date, this.mondayBased)
  }

  getDate() {
      return this._date
  }

  getDates() {
    let result = [this._date]
    for (let i = 1; i < dateUtils.DAYS_OF_WEEK.length; i++) {
        result.push(dateUtils.incDay(this._date, i))
    }
    return result
  }

}