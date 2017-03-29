import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
