import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatRulesComponent } from './repeat-rules.component';

describe('RepeatRulesComponent', () => {
  let component: RepeatRulesComponent;
  let fixture: ComponentFixture<RepeatRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepeatRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
