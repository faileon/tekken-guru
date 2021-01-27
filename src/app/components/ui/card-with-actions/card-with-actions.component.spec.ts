import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWithActionsComponent } from './card-with-actions.component';

describe('CardWithActionsComponent', () => {
  let component: CardWithActionsComponent;
  let fixture: ComponentFixture<CardWithActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardWithActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardWithActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
