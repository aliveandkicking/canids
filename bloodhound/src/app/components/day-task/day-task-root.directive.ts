import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[plDayTaskRoot]'
})
export class DayTaskRootDirective {

  constructor(private el: ElementRef) {

  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(0.5);
    console.log('mouseenter');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(1);
    console.log('mouseleave');
  }

  private highlight(v: number) {
    this.el.nativeElement.style.opacity = v;
  }

}
