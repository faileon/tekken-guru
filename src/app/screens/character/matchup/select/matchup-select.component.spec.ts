import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchupSelectComponent } from './matchup-select.component';

describe('MatchupSelectComponent', () => {
  let component: MatchupSelectComponent;
  let fixture: ComponentFixture<MatchupSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchupSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
