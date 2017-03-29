import { Component, OnInit } from '@angular/core';
import { DayService } from '../../services/day.service';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
  providers: [DayService]
})
export class DayComponent implements OnInit { 

  constructor(
    private dayService: DayService
  ) { }

  ngOnInit() {
    
  }

  getTasks(): string[] {
    return this.dayService.viewModel.getTasks()
  }

}
