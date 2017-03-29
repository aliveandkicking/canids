import { Injectable } from '@angular/core';
import { DayViewModel } from '../../../../shared/viewmodels/day.viewmodel';

@Injectable()
export class DayService {

  getViewModel (): DayViewModel {
    return new DayViewModel();
  }

}
