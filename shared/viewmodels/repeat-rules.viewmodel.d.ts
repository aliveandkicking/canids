export declare class RepeatRulesViewModel {
  getMode(): number;
  setMode(repeatMode: number): void;

  getRepeatEvery(): number;
  setRepeatEvery(repeatEvery: number): void;

  getStartDate(): Date;
  setStartDate(date: Date): void;

  getEndDate(): Date;
  setEndDate(date: Date): void;

  getNeverEnd(): boolean;
  setNeverEnd(neverEnd: boolean);

  getWeekDays(): string[];
  getWeekDaysToRepeat(): number[];
  setWeekDaysToRepeat(weekDays: number[]): void;
  changeWeekDayToRepeat(weekDay: number): void;

  getUseDayOfTheLastWeek(): boolean;  
  setUseDayOfTheLastWeek(useDayOfTheLastWeek: boolean);

  getRepeatModeList(): {id: number, name: string, title: string}[];
  containsDate(date: Date): boolean;
}