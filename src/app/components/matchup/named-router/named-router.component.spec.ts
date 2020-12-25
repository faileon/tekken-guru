import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamedRouterComponent } from './named-router.component';

describe('NamedRouterComponent', () => {
  let component: NamedRouterComponent;
  let fixture: ComponentFixture<NamedRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamedRouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamedRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
