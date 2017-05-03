import { Component, OnInit, Inject, Input } from '@angular/core';
import { DayService } from '../../services/day.service';
import { DayViewModel } from '../../../../../shared/viewmodels/day.viewmodel';

@Component({
  selector: 'pl-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() viewModel: DayViewModel = null;

  constructor(

  ) { }

  ngOnInit() { }

  getDate () {
    return this.viewModel.getDate();
  }


}
