import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartUpFrameFilterComponent } from './start-up-frame-filter.component';

describe('StartUpFrameFilterComponent', () => {
  let component: StartUpFrameFilterComponent;
  let fixture: ComponentFixture<StartUpFrameFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartUpFrameFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartUpFrameFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
