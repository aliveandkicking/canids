export declare class DayViewModel{
    getDate(): Date;
    setDate(date: Date): void;
    getTasksNames(): string[];
    finalize(): void;
    subscribeForTaskListChange(callback: () => void): void;
}