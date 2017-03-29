export const dateUtils = {

  MILISECONDS_IN_DAY: 24 * 60 * 60 * 1000,
  DAYS_IN_WEEK: 7,

  sameDay: function (dateOne, dateTwo) {
    return ((dateOne.getDate() === dateTwo.getDate()) &&
      (dateOne.getMonth() === dateTwo.getMonth()) &&
      (dateOne.getFullYear() === dateTwo.getFullYear()))
  },

  isToday(date) {
    return dateUtils.sameDay(new Date(), date)
  },

  sameDayOrBefore (date, dateToCompare) {
    return (dateUtils.sameDay(date, dateToCompare) || (date > dateToCompare))
  },

  sameDayOrAfter (date, dateToCompare) {
    return (dateUtils.sameDay(date, dateToCompare) || (date < dateToCompare))
  },

  decDay (date) {
    return new Date(date.getTime() - dateUtils.MILISECONDS_IN_DAY)
  },

  incDay (date) {
    return new Date(date.getTime() + dateUtils.MILISECONDS_IN_DAY)
  },

  getStartOfMonth(date) {
    return new Date(dateOne.getFullYear(), dateOne.getMonth(), 1)
  },

  mondayBasedDayOfWeek(date) {
    return (date.getDay() == 0 ? 6 : (date.getDay() - 1))
  }

}
