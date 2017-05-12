import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditTaskComponent } from './page-edit-task.component';

describe('PageEditTaskComponent', () => {
  let component: PageEditTaskComponent;
  let fixture: ComponentFixture<PageEditTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEditTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
