import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Options} from 'ng5-slider';
import {NumberRange} from '../../../types';
import {getDebouncedFilterRange} from '../../../utils/common';

@Component({
  selector: 'tg-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input()
  public range!: NumberRange;

  @Output()
  public rangeChange = new EventEmitter<NumberRange>();

  @Input()
  public options!: Options;



  constructor() {
  }

  ngOnInit(): void {

  }

  public onRangeChange(): void {
    getDebouncedFilterRange(this.range).then(range => {
      this.rangeChange.emit(range);
    });
  }


}
