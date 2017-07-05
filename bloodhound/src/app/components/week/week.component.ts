import { Component, OnInit, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CreateViewModelToken, createViewModel } from '../../services/create-viewmodel.service';
import { WeekViewModel } from '../../../../../shared/viewmodels/week.viewmodel';
import { DayViewModel } from '../../../../../shared/viewmodels/day.viewmodel';
import { DateUtilsService } from '../../shared/services/date-utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pl-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css'],
  providers: [{
      provide: CreateViewModelToken,
      useValue: createViewModel(WeekViewModel)
  }]
})
export class WeekComponent implements OnInit, OnChanges {
  @Input() date: Date;

  constructor(
    @Inject(CreateViewModelToken) private viewModel: WeekViewModel,
    private dateUtilsService: DateUtilsService,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['date']) {
      this.viewModel.setDate(this.date);
    }
  }

  getDates(): Date[] {
    console.log('get Dates: ');
    return this.viewModel.getDates();
  }

  getDayViewModel(date): DayViewModel {
    return this.viewModel.getDayViewModel(date);
  }

  today() {
    this.router.navigate(['/week', new Date()]);
  }

  next(): void {
    const date = this.dateUtilsService.getDateStrForUrl(this.viewModel.getNextWeekDate());
    this.router.navigate(['/week', date]);
  }

  prev(): void {
    const date = this.dateUtilsService.getDateStrForUrl(this.viewModel.getPrevWeekDate());
    this.router.navigate(['/week', date]);
  }

  getCaption(): string {
    return this.viewModel.getCaption();
  }

}

