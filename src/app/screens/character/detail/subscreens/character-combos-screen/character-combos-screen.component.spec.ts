import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCombosScreenComponent } from './character-combos-screen.component';

describe('CharacterCombosScreenComponent', () => {
  let component: CharacterCombosScreenComponent;
  let fixture: ComponentFixture<CharacterCombosScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterCombosScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCombosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
