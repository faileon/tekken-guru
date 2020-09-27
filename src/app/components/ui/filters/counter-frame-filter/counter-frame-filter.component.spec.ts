import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterFrameFilterComponent } from './counter-frame-filter.component';

describe('CounterFrameFilterComponent', () => {
  let component: CounterFrameFilterComponent;
  let fixture: ComponentFixture<CounterFrameFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterFrameFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterFrameFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
