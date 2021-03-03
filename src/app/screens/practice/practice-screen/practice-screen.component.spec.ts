import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeScreenComponent } from './practice-screen.component';

describe('PracticeScreenComponent', () => {
  let component: PracticeScreenComponent;
  let fixture: ComponentFixture<PracticeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
