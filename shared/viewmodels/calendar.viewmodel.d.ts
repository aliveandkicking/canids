export declare class CalendarViewModel {
  getCurrentYear(): number; 
  getCurrentDates(): Date[][];
  getWeekDays(): {index: number; name: string}[][];
  getCurrentMonth(): number; 
  setCurrentMonth(month: number): void;
  getCurrentMonthName(): string;
  getMonths(): {index: number; name: string}[][];
  setMonthMode(isMonthMode: boolean): void;
  isMonthMode(): boolean;
  dateIsSelected(date: Date): boolean; 
  weekDayIsSelected(weekDay: number): boolean; 
  dateActivated(date: Date): void;
  monthActivated(month: number): void;
  dayOfWeekActivated(dayOfWeek: number): void;
  next(): void;
  prev(): void;
}