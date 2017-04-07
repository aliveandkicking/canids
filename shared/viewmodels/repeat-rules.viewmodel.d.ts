export declare class RepeatRulesViewModel {
  getMode(): number;
  setMode(repeatMode: number): void;
  getRepeatModeList(): {id: number, name: string}[];
  getRepeatEvery(): number;
  setRepeatEvery(repeatEvery: number);

  getOccurrenecsLimit(): number;
  setOccurrenecsLimit(limit: number);
  setStartDate(date: Date);
  getEndDate(): Date;
  setEndDate(date: Date);
  
  getWeekDaysToRepeat(): number[];
  setWeekDaysToRepeat(weekDays: number[]);
  getUseDayOfTheLastWeek(): boolean;
  setUseDayOfTheLastWeek(useDayOfTheLastWeek: boolean);
  containsDate(date: Date): boolean;
}