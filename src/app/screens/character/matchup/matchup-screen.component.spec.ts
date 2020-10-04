import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchupScreenComponent } from './matchup-screen.component';

describe('MatchupComponent', () => {
  let component: MatchupScreenComponent;
  let fixture: ComponentFixture<MatchupScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchupScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchupScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
