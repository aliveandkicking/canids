import { DayViewModel } from "./day.viewmodel";

export declare class WeekViewModel {
  getDates(): Date[];
  getDayViewModel(date: Date): DayViewModel;
}