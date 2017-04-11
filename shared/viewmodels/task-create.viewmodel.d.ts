import { RepeatRulesViewModel } from "./repeat-rules.viewmodel";

export declare class TaskCreateViewModel {
  getTaskName(): string;
  setTaskName (name: string): void;
  getRepeatRulesViewModel(): RepeatRulesViewModel;
  save(): void;
  cancel(): void;
}