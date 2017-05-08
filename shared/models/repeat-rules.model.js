const dateUtils = require('../utils/dateutils').dateUtils
const BaseModel = require( './base.model').BaseModel

const REPEAT_MODE = {
  ONCE: 0,
  DAILY: 1,
  WEEKLY: 2,
  MONTHLY: 3,
  YEARLY: 4,
  ALLOWED: [0, 1, 2, 3, 4]  // biktop
}

class BaseRules {
  constructor (every = 1) {
    this.every = every
  }
}

class DailyRules extends BaseRules {}

class WeeklyRules extends BaseRules {
  constructor (every = 1) {
    super(every)
    this.weekDays = [].concat(dateUtils.MO_FR) // biktop is bad practice
  }
}

class MonthlyRules extends BaseRules {
  constructor (every = 1) {
    super(every)
    this.dayOfTheLastWeek = false
  }
}

class YearlyRules extends BaseRules {}

class RepeatRulesModel extends BaseModel {
  constructor () {
    super()
    this._mode = REPEAT_MODE.ONCE
    this.dailyRules = new DailyRules()
    this.weeklyRules = new WeeklyRules()
    this.monthlyRules = new MonthlyRules()
    this.yearlyRules = new YearlyRules()

    this._mondayBased = true
    this._startDate = dateUtils.clearTime(new Date())
    this._endDate = dateUtils.clearTime(new Date())
    this._skipDates = []
    this.neverEnd = true

    this.addSkipDate(new Date())
  }

  setMondayBased (mondayBased) {
    this._mondayBased = mondayBased
  }

  addSkipDate (date) {
    this._skipDates.push(dateUtils.clearTime(date).getTime())
  }

  getStartDate () {
    return this._startDate
  }

  setStartDate (date) {
    if (date) {
      this._startDate = dateUtils.clearTime(date)
    }
  }

  getEndDate (date) {
    return this._endDate
  }

  setEndDate (date) {
    if (date) {
      this._endDate = date ? dateUtils.clearTime(date) : null
    }
  }

  getRepeatMode () {
    return this._mode
  }

  changeWeekDayToRepeat (weekDay) {
    if (dateUtils.DAYS_OF_WEEK.includes(weekDay)) {
      if (this.weeklyRules) {
        let index = this.weeklyRules.weekDays.indexOf(weekDay)
        if (index < 0) {
          this.weeklyRules.weekDays.push(weekDay)
        } else {
          this.weeklyRules.weekDays.splice(index, 1)
        }
      }
    }
  }

  setRepeatMode (mode) {
    if (REPEAT_MODE.ALLOWED.includes(mode)) { // biktop
      this._mode = mode
      if ((this._mode === REPEAT_MODE.DAILY) && (!this.dailyRules)) {
        this.dailyRules = new DailyRules()
      } else if ((this._mode === REPEAT_MODE.WEEKLY) && (!this.weeklyRules)) {
        this.weeklyRules = new WeeklyRules()
      } else if ((this._mode === REPEAT_MODE.MONTHLY) && (!this.monthlyRules)) {
        this.monthlyRules = new MonthlyRules()
      } else if ((this._mode === REPEAT_MODE.YEARLY) && (!this.yearlyRules)) {
        this.yearlyRules = new YearlyRules()
      }
    }
  }

  _checkDailyRules (date) {
    if (this.dailyRules) {
      return (dateUtils.getDaysBetween(date, this._startDate) % this.dailyRules.every === 0)
    }
    return false
  }

  _checkWeeklyRules (date) {
    if (this.weeklyRules) {
      let firstDayOfWeek = dateUtils.getStartOfWeek(date)
      let originFirstDayOfWeek = dateUtils.getStartOfWeek(this._startDate)
      let weeksPassed =
        (dateUtils.getDaysBetween(originFirstDayOfWeek, firstDayOfWeek) /
        dateUtils.DAYS_OF_WEEK.length)

      if (weeksPassed % this.weeklyRules.every === 0) {
        return this.weeklyRules.weekDays.includes(date.getDay())
      }
    }
    return false
  }

  _checkMonthlyRules (date) {
    if (this.monthlyRules) {
      if (this.monthlyRules.dayOfTheLastWeek) {
        let dayOfWeek = date.getDay()
        let expectedDayOfWeek = this._startDate.getDay()
        if (dayOfWeek === expectedDayOfWeek) {
          let nextWeekDay = dateUtils.incDay(date, dateUtils.DAYS_OF_WEEK.length)
          return (nextWeekDay.getMonth() !== date.getMonth())
        }
      } else {
        return (date.getDate() === this._startDate.getDate())
      }
    }// biktop
    return false
  }

  _checkYearlyRules (date) {
    if (this.yearlyRules) {
      return (
        (date.getDate() === this._startDate.getDate()) &&
        (date.getMonth() === this._startDate.getMonth()) &&
        ((date.getFullYear() - this._startDate.getFullYear()) %
          this.yearlyRules.every === 0)
      )
    }
    return false
  }

  _checkPeriod (date) {
    if (this._startDate) {
      if (date < this._startDate) {
        return false
      }
    }
    if ((this._endDate) && (!this.neverEnd)) {
      if (date > this._endDate) {
        return false
      }
    }
    return true
  }

  containsDate (date) {
    if (!date) {
      return false
    }
    date = dateUtils.clearTime(date)
    if (this._skipDates.includes(date.getTime())) {
      return false
    } else if (date.getTime() === this._startDate.getTime()) {
      return true
    } else if (!this._checkPeriod(date)) {
      return false
    } else if (this._mode === REPEAT_MODE.DAILY) {
      return this._checkDailyRules(date)
    } else if (this._mode === REPEAT_MODE.WEEKLY) {
      return this._checkWeeklyRules(date)
    } else if (this._mode === REPEAT_MODE.MONTHLY) {
      return this._checkMonthlyRules(date)
    } else if (this._mode === REPEAT_MODE.YEARLY) {
      return this._checkYearlyRules(date)
    } else {
      return false
    }
  }

}

module.exports.REPEAT_MODE = REPEAT_MODE
module.exports.RepeatRulesModel = RepeatRulesModel