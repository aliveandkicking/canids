import { Component, OnInit, Input } from '@angular/core';
import { CreateViewModelToken, createViewModel } from '../../services/create-viewmodel.service';
import { RepeatRulesViewModel } from '../../../../../shared/viewmodels/repeat-rules.viewmodel';


@Component({
  selector: 'repeat-rules',
  templateUrl: './repeat-rules.component.html',
  styleUrls: ['./repeat-rules.component.css'],
  providers: [{
      provide: CreateViewModelToken,
      useValue: createViewModel(RepeatRulesViewModel)
  }]
})
export class RepeatRulesComponent implements OnInit {  
  @Input() viewModel: RepeatRulesViewModel = null 

  constructor() { 
    this.onCheckIfDateIsSelected = this.onCheckIfDateIsSelected.bind(this);
  }

  ngOnInit() {
    this.viewModel.setStartDate(new Date())
  }

  getRepeatModeList(): {id: number, name: string}[]  {
    return this.viewModel.getRepeatModeList()
  }

  onDateClick(date: Date): void { };

  onCheckIfDateIsSelected(date: Date): boolean {
    if (this.viewModel) {
      return this.viewModel.containsDate(date)
    }
  };

  doCheck() {// biktop
    this.viewModel.setMode(2)
    this.viewModel.setRepeatEvery(4);
    this.viewModel.setWeekDaysToRepeat([0,3,6])
    this.viewModel.setUseDayOfTheLastWeek(true);
    this.viewModel.setEndDate(new Date(2020, 3, 29))
  }

}
