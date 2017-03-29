import { Injectable } from '@angular/core';
import { DayViewModel } from '../../../../shared/viewmodels/day.viewmodel';

@Injectable()
export class DayService {
  viewModel: DayViewModel = null

  constructor() { 
    this.viewModel = new DayViewModel();
  }

}
