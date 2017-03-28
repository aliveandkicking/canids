import {dateUtils} from './dateutils'

class DateRange {
  constructor (date = new Date()) {
    this.begin = date
    this.end = date
  }

  contains (date) {
    if (!date) {
      return false
    }
    return dateUtils.sameDayOrAfter(this.begin, date) &&
           dateUtils.sameDayOrBefore(this.end, date)
  }

  isNextDay (date) {
    if (!date) {
      return
    }
    return this.contains(
      new Date(date.getTime() - dateUtils.MILISECONDS_IN_DAY))
  }

  isPrevDay (date) {
    if (!date) {
      return
    }
    return this.contains(
      new Date(date.getTime() + dateUtils.MILISECONDS_IN_DAY))
  }

  clone () {
    let result = new DateRange()
    result.begin = new Date(this.begin.getTime())
    result.end = new Date(this.end.getTime())
    return result
  }
}

export class DateRangeArray {
  constructor () {
    this.array = []
  }

  containsDate (date) {
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].contains(date)) {
        return true
      }
    }
    return false
  }

  normalize () {
    let i = 0
    let j = 0
    let canMergeBegin
    let canMergeEnd
    while (i < this.array.length) {
      while (j < this.array.length) {
        if (i !== j) {
          canMergeBegin =
            dateUtils.sameDayOrAfter(this.array[i].begin, this.array[j].end) ||
            this.array[i].isPrevDay(this.array[j].end)
          canMergeEnd =
            dateUtils.sameDayOrBefore(this.array[i].end, this.array[j].begin) ||
            this.array[i].isNextDay(this.array[j].begin)

          if (canMergeBegin && canMergeEnd) {
            if (this.array[i].begin > this.array[j].begin) {
              this.array[i].begin = this.array[j].begin
            }
            if ((this.array[i].end < this.array[j].end)) {
              this.array[i].end = this.array[j].end
            }
            this.array.splice(j, 1)
            if (j < i) {
              i--
            }
          }
        }
        j++
      }
      i++
    }
    this.sort()
  }

  sort () {
    this.array.sort(function (a, b) {
      if (a.begin > b.begin) {
        return 1
      }
      if (a.begin < b.begin) {
        return -1
      }
      return 0
    })
  }

  addDate (date) {
    if (!date) { return console.warn('invalid params') }

    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].contains(date)) {
        return
      } else if (this.array[i].isNextDay(date)) {
        this.array[i].end = date
        this.normalize()
        return
      } else if (this.array[i].isPrevDay(date)) {
        this.array[i].begin = date
        this.normalize()
        return
      }
    }
    this.array.push(new DateRange(date))
  }

  removeDate (date) {
    if (!date) { return console.warn('invalid params') }

    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].contains(date)) {
        if (dateUtils.sameDay(this.array[i].begin, date)) {
          this.array[i].begin = dateUtils.incDay(this.array[i].begin)
        } else if (dateUtils.sameDay(this.array[i].end, date)) {
          this.array[i].end = dateUtils.decDay(this.array[i].end)
        } else {
          let range = new DateRange(dateUtils.incDay(date))
          range.end = this.array[i].end
          this.array[i].end = dateUtils.decDay(date)
          this.array.splice(i + 1, 0, range)
        }
        return
      }
    }
  }
}
