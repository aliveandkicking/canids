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

  getCaption () {
    const startDateData = dateUtils.decodeDate(this._model.getDate())
    const endDateData = dateUtils.decodeDate(this._model.getEndDate())
    let result = ''

    if (startDateData[1] === endDateData[1]) {
      result = ` ${dateUtils.MONTH_NAMES[startDateData[1]]} ${startDateData[2]} - ${endDateData[2]}, `
    } else {
      result = ` ${dateUtils.MONTH_NAMES[startDateData[1]]} ${startDateData[2]} -  ${dateUtils.MONTH_NAMES[endDateData[1]]} ${endDateData[2]}, `
    }
    result += startDateData[0] !== endDateData[0] ? startDateData[0] + ' - ' + endDateData[0] : startDateData[0]
    return result // biktop
  }

  today () {
    this._model.setDate(new Date())
    this._initDays()
  }

  next () {
    this._model.next()
    this._initDays()
  }

  prev () {
    this._model.prev()
    this._initDays()
  }

  getDayViewModel (date) {
    return this.days.find((viewModel) => {
      return dateUtils.sameDay(viewModel.getDate(), date)
    })
  }

}
