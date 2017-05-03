class DateUtils {
  constructor () {
    this.MILISECONDS_IN_DAY = 24 * 60 * 60 * 1000; // consider timezones change e.g. last sun of oct

    [this.SU, this.MO, this.TU, this.WE, this.TH, this.FR, this.SA] = [0, 1, 2, 3, 4, 5, 6]
    this.DAYS_OF_WEEK = [this.SU, this.MO, this.TU, this.WE, this.TH, this.FR, this.SA]
    this.DAYS_OF_WEEK_MONDAY_BASED = [this.MO, this.TU, this.WE, this.TH, this.FR, this.SA, this.SU]
    this.MO_FR = [this.MO, this.TU, this.WE, this.TH, this.FR]
    this.DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    [this.JAN, this.DEC] = [0, 11]
    this.MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    this.MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }

  sameDay (dateOne, dateTwo) {
    if ((!dateOne) || (!dateTwo)) {
      return false
    }
    return ((dateOne.getDate() === dateTwo.getDate()) &&
      (dateOne.getMonth() === dateTwo.getMonth()) &&
      (dateOne.getFullYear() === dateTwo.getFullYear()))
  }

  isToday (date) {
    return dateUtils.sameDay(new Date(), date)
  }

  sameDayOrBefore (date, dateToCompare) {
    return (dateUtils.sameDay(date, dateToCompare) || (date > dateToCompare))
  }

  sameDayOrAfter (date, dateToCompare) {
    return (dateUtils.sameDay(date, dateToCompare) || (date < dateToCompare))
  }

  incDay (date, numberOfDays = 1) {
    let result = new Date(date.getTime())
    result.setDate(result.getDate() + numberOfDays)
    return result
  }

  decDay (date, numberOfDays = 1) {
    return this.incDay(date, 0 - numberOfDays)
  }

  getStartOfMonth (date) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  getStartOfWeek (date, mondayBased = true) {
    return dateUtils.decDay(
      date,
      mondayBased
        ? this.mondayBasedDayOfWeek(date)
        : date.getDay())
  }

  mondayBasedDayOfWeekIdx (index) {
    return (index === 0 ? 6 : (index - 1))
  }

  mondayBasedDayOfWeek (date) {
    return dateUtils.mondayBasedDayOfWeekIdx(date.getDay())
  }

  getUTCTime (date) {
    return date.getTime() + date.getTimezoneOffset()
  }

  getDaysBetween (startDate, endDate) {
    return Math.abs(Math.floor(
      (this.getUTCTime(endDate) - this.getUTCTime(startDate)) / dateUtils.MILISECONDS_IN_DAY))
  }

  encodeDate (date) {
    return [date.getFullYear(), date.getMonth(), date.getDate()]
  }

  clearTime (date) {
    return new Date(...dateUtils.encodeDate(date))
  }
}

export const dateUtils = new DateUtils()

