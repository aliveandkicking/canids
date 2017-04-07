import { Component, OnInit, Inject } from '@angular/core';
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
    @Inject(CreateViewModelToken) private viewModel: TaskCreateViewModel
  ) { }

  ngOnInit() {
  }

  getRepeat(): boolean {
    return this.viewModel.getRepeat() 
  }

  getRepeatRulesViewModel(): RepeatRulesViewModel {
    return this.viewModel.getRepeatRulesViewModel()
  }

}
