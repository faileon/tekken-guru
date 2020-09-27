import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovePropertiesFilterComponent } from './normal-frame-filter.component';

describe('NormalFrameFilterComponent', () => {
  let component: MovePropertiesFilterComponent;
  let fixture: ComponentFixture<MovePropertiesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovePropertiesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovePropertiesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
