import { WeekModel } from '../models/week.model'
import { dateUtils } from '../utils/dateutils'
import { DayViewModel } from './day.viewmodel'

export class WeekViewModel {
  constructor () {
    this._model = new WeekModel()
    this.days = []
    this._initDays()
  }

  _initDays () {
    this.getDates().forEach((date, i) => {
      if (!this.days[i]) {
        this.days[i] = new DayViewModel()
      }
      this.days[i].setDate(date)
    })
  }

  getDates () {
    return this._model.getDates()
  }

  setDate (date) {
    this._model.setDate(date)
    this._initDays()
  }

  today () {
    this._model.setDate(new Date())
  }

  next () {
    this._model.next()
  }

  prev () {
    this._model.prev()
  }

  getDayViewModel (date) {
    return this.days.find((viewModel) => {
      return dateUtils.sameDay(viewModel.getDate(), date)
    })
  }

}
