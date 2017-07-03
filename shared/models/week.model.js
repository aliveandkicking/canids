import { BaseModel } from './base.model'
import { dateUtils } from '../utils/dateutils'
import { DayModel } from './day.model'

export class WeekModel extends BaseModel {
  constructor () {
    super()
    this._date = null
    this.mondayBased = true
    this.days = []
    this.setDate(new Date())
  }

  refreshDays () {


  }


  initDays () {
    this.getDates().forEach((date, i) => {
      if (!this.days[i]) {
        this.days[i] = new DayModel()
        // this.days[i].onGetCustomLoadPromise = this.getLoadDayPromise.bind(this)
      }
      this.days[i].setDate(date)
    })
  }

  setDate (date) {
    this._date = dateUtils.getStartOfWeek(date, this.mondayBased)
    this.initDays()
  }

  getDate () {
    return this._date
  }

  getEndDate () {
    return dateUtils.incDay(this.getDate(), dateUtils.DAYS_IN_WEEK)
  }

  next () {
    this.setDate(dateUtils.incDay(this.getDate(), dateUtils.DAYS_IN_WEEK))
    this.initDays()
  }

  prev () {
    this.setDate(dateUtils.decDay(this.getDate(), dateUtils.DAYS_IN_WEEK))
    this.initDays()
  }

  getDates () {
    let result = [this._date]
    for (let i = 1; i < dateUtils.DAYS_OF_WEEK.length; i++) {
      result.push(dateUtils.incDay(this._date, i))
    }
    return result
  }
}
