import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailScreenComponentComponent } from './character-detail-screen-component.component';

describe('CharacterDetailScreenComponentComponent', () => {
  let component: CharacterDetailScreenComponentComponent;
  let fixture: ComponentFixture<CharacterDetailScreenComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDetailScreenComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailScreenComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
