import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombosScreenComponent } from './character-combos-screen.component';

describe('CharacterCombosScreenComponent', () => {
  let component: CombosScreenComponent;
  let fixture: ComponentFixture<CombosScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombosScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
