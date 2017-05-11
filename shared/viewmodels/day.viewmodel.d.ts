import { DayTaskViewModel } from './day-task.viewmodel';

export declare class DayViewModel{
    getDate(): Date;
    setDate(date: Date): void;
    getDayTasksViewModels(): DayTaskViewModel[];
    finalize(): void;
    setOnTaskListChange(callback: () => void): void;
}
