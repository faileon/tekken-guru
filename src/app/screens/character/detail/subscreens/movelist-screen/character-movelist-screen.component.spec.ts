import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterMovelistScreenComponent } from './character-movelist-screen.component';

describe('CharacterMovelistScreenComponent', () => {
  let component: CharacterMovelistScreenComponent;
  let fixture: ComponentFixture<CharacterMovelistScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterMovelistScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterMovelistScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
