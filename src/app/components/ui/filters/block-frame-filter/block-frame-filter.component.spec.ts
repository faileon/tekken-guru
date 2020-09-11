import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockFrameFilterComponent } from './block-frame-filter.component';

describe('BlockFrameFilterComponent', () => {
  let component: BlockFrameFilterComponent;
  let fixture: ComponentFixture<BlockFrameFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockFrameFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockFrameFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
