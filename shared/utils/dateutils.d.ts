interface DateUtils {
  MILISECONDS_IN_DAY: number,
  SU: number,
  MO: number,
  TU: number,
  WE: number,
  TH: number,
  FR: number,
  SA: number,
  DAYS_OF_WEEK: number[],
  DAYS_OF_WEEK_MONDAY_BASED: number[],
  MO_FR: number[],
  DAY_NAMES: string[],
  JAN: number,
  DEC: number,
  MONTH_NAMES: string[],
  MONTH_NAMES_SHORT: string[],

  sameDay(dateOne: Date, dateTwo: Date): boolean,
  isToday(date: Date): boolean,
  sameDayOrBefore(date: Date, dateToCompare: Date): boolean,
  sameDayOrAfter(date: Date, dateToCompare: Date): boolean,
  decDay(date: Date, numberOfDays: number = 1): Date,
  incDay(date: Date, numberOfDays: number = 1): Date,
  getStartOfMonth(date: Date): Date,
  mondayBasedDayOfWeekIdx (index: number): number,
  mondayBasedDayOfWeek (date: Date): number,
  getDaysBetween (startDate: Date, endDate: Date): number,
  encodeDate (date: Date): number[],
  clearTime (date: Date): Date
}

export declare let dateUtils: DateUtils;