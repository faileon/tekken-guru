import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterKeyMovesScreenComponent } from './character-key-moves-screen.component';

describe('CharacterKeyMovesScreenComponent', () => {
  let component: CharacterKeyMovesScreenComponent;
  let fixture: ComponentFixture<CharacterKeyMovesScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterKeyMovesScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterKeyMovesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
