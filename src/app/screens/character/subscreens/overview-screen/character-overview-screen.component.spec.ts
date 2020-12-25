import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterOverviewScreenComponent } from './character-overview-screen.component';

describe('CharacterOverviewScreenComponent', () => {
  let component: CharacterOverviewScreenComponent;
  let fixture: ComponentFixture<CharacterOverviewScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterOverviewScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterOverviewScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
