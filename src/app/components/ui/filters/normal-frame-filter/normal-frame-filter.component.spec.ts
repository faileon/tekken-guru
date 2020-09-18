import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalFrameFilterComponent } from './normal-frame-filter.component';

describe('NormalFrameFilterComponent', () => {
  let component: NormalFrameFilterComponent;
  let fixture: ComponentFixture<NormalFrameFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalFrameFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalFrameFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
