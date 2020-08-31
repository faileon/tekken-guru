import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPunishesScreenComponent } from './character-punishes-screen.component';

describe('CharacterPunishesScreenComponent', () => {
  let component: CharacterPunishesScreenComponent;
  let fixture: ComponentFixture<CharacterPunishesScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterPunishesScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterPunishesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
