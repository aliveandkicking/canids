import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { EditTaskService } from '../../services/edit-task.service';
import { CreateViewModelToken, createViewModel } from '../../services/create-viewmodel.service';
import { TaskCreateViewModel } from '../../../../../shared/viewmodels/task-create.viewmodel';
import { RepeatRulesViewModel } from '../../../../../shared/viewmodels/repeat-rules.viewmodel';


@Component({
  selector: 'create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
    providers: [{
      provide: CreateViewModelToken,
      useValue: createViewModel(TaskCreateViewModel)
  }]
})
export class CreateTaskComponent implements OnInit {

  constructor(
    @Inject(CreateViewModelToken) private viewModel: TaskCreateViewModel,
    private editTaskService: EditTaskService
  ) { }

  ngOnInit() { }

  getRepeatRulesViewModel(): RepeatRulesViewModel {
    return this.viewModel.getRepeatRulesViewModel();
  }

  setTaskName(name: string): void {
    this.viewModel.setTaskName(name);
  }

  getTaskName(): string {
    return this.viewModel.getTaskName();
  }

  save() {
    this.viewModel.save();
    this.editTaskService.finishEditing()
  }

  cancel() {
    this.editTaskService.finishEditing()
  }
}
