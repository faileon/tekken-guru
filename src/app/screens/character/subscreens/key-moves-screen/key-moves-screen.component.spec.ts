import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyMovesScreenComponent } from './character-key-moves-screen.component';

describe('CharacterKeyMovesScreenComponent', () => {
  let component: KeyMovesScreenComponent;
  let fixture: ComponentFixture<KeyMovesScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyMovesScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyMovesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
