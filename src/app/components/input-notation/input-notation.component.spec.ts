import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNotationComponent } from './input-notation.component';

describe('InputNotationComponent', () => {
  let component: InputNotationComponent;
  let fixture: ComponentFixture<InputNotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputNotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
