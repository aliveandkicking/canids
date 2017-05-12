import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWeekComponent } from './page-week.component';

describe('PageWeekComponent', () => {
  let component: PageWeekComponent;
  let fixture: ComponentFixture<PageWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
