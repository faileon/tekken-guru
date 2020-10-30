import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HitLevelFilterComponent } from './hit-level-filter.component';

describe('HitLevelFilterComponent', () => {
  let component: HitLevelFilterComponent;
  let fixture: ComponentFixture<HitLevelFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HitLevelFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HitLevelFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
