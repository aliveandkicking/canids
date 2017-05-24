import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pl-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  private isVisible = true;

  constructor() { }

  ngOnInit() { }

  closePopup(): void {
    this.isVisible = false;
  }

  showPopup(): void {
    this.isVisible = true;
  }

}
