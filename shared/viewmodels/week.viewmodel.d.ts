import { DayViewModel } from "./day.viewmodel";

export declare class WeekViewModel {
  getDates(): Date[];
  getDayViewModel(date: Date): DayViewModel;
  getCaption(): string;
  today(): void;
  next(): void;
  prev(): void;
}