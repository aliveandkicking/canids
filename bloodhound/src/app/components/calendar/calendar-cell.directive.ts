import { Directive, Input, ElementRef, OnInit, OnChanges, HostListener } from '@angular/core';

@Directive({
  selector: '[calendar-cell]'
})
export class ClickEventDirective {
  @Input() selected: boolean;

  constructor(private el: ElementRef) { }

  ngOnInit() { }


}
