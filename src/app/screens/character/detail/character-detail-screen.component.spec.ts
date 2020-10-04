import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailScreenComponent } from './character-detail-screen.component';

describe('CharacterDetailScreenComponentComponent', () => {
  let component: CharacterDetailScreenComponent;
  let fixture: ComponentFixture<CharacterDetailScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDetailScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
