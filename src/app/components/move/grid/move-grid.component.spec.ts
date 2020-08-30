import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveGridComponent } from './move-grid.component';

describe('MoveGridComponent', () => {
  let component: MoveGridComponent;
  let fixture: ComponentFixture<MoveGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
