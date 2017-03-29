import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() name: string;
  @Input() id: number;
  
  @Output() onComplete: EventEmitter<number>
  @Output() onDelete: EventEmitter<number>

  constructor() { 
    this.onComplete = new EventEmitter<number>();
    this.onDelete = new EventEmitter<number>();
  }

  ngOnInit() {
  }

  complete() {
    this.onComplete.emit(this.id)
    console.log('complete', this.name);    
  }

  delete() {
    this.onDelete.emit(this.id)
    console.log('delete', this.name);    
  }

}
