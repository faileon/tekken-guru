import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBackComponent } from './navigation-back.component';

describe('NavigationBackComponent', () => {
  let component: NavigationBackComponent;
  let fixture: ComponentFixture<NavigationBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
