import { Component, OnInit, Inject } from '@angular/core';
import { DayService } from '../../services/day.service';
import { CreateViewModelToken, createViewModel } from '../../services/create-viewmodel.service';
import { DayViewModel } from '../../../../../shared/viewmodels/day.viewmodel';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  providers: [{ 
      provide: CreateViewModelToken,
      useValue: createViewModel(DayViewModel)
  }]
})
export class DayComponent implements OnInit {  

  constructor(
    @Inject(CreateViewModelToken) private viewModel: DayViewModel    
  ) { }

  ngOnInit() {    
    this.setDate(new Date())
  }

  getTasksIds(): number[] {
    return this.viewModel.getTasksIds()
  }

  getTaskNameById(id: number): string {
    return this.viewModel.getTaskNameById(id)
  }

  setDate(date: Date): void {
    this.viewModel.setDate(date);
  }

}
