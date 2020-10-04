import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MovelistScreenComponent} from './movelist-screen.component';



describe('MovelistScreenComponent', () => {
  let component: MovelistScreenComponent;
  let fixture: ComponentFixture<MovelistScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovelistScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovelistScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
