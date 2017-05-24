import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CreateViewModelToken, createViewModel } from '../../services/create-viewmodel.service';
import { TaskCreateViewModel } from '../../../../../shared/viewmodels/task-create.viewmodel';
import { RepeatRulesViewModel } from '../../../../../shared/viewmodels/repeat-rules.viewmodel';


@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
    providers: [{
      provide: CreateViewModelToken,
      useValue: createViewModel(TaskCreateViewModel)
  }]
})
export class EditTaskComponent implements OnInit {

  constructor(
    @Inject(CreateViewModelToken) private viewModel: TaskCreateViewModel,
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
  }
}
