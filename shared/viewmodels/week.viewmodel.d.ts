import { DayViewModel } from "./day.viewmodel";

export declare class WeekViewModel {
  setDate(date: Date): void;
  getDates(): Date[];
  getDayViewModel(date: Date): DayViewModel;
  getCaption(): string;
  getNextWeekDate(): Date;
  getPrevWeekDate(): Date;
}