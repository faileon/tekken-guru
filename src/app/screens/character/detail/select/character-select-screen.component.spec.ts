import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSelectScreenComponent } from './character-select-screen.component';

describe('CharacterSelectComponent', () => {
  let component: CharacterSelectScreenComponent;
  let fixture: ComponentFixture<CharacterSelectScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSelectScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSelectScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
