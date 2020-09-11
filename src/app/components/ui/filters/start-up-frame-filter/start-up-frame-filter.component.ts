import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Options} from 'ng5-slider';
import {DEF_STARTUP_MAX_VAL, DEF_STARTUP_MIN_VAL} from '../../../../config/default-frames.config';
import {NumberRange} from '../../../../types';
import {getDebouncedFilterRange} from '../../../../utils/common';

@Component({
  selector: 'tg-start-up-frame-filter',
  templateUrl: './start-up-frame-filter.component.html',
  styleUrls: ['./start-up-frame-filter.component.scss']
})
export class StartUpFrameFilterComponent {

  @Input()
  public range!: NumberRange;

  @Output()
  public rangeChange = new EventEmitter<NumberRange>();

  public options: Options = {
    floor: DEF_STARTUP_MIN_VAL,
    ceil: DEF_STARTUP_MAX_VAL,
    animate: false,
    translate: value => value >= DEF_STARTUP_MAX_VAL ? '+All' : `${value}`
  };

  public onRangeChange(range: NumberRange): void {
    getDebouncedFilterRange().then(() => {
      this.rangeChange.emit(range);
    });
  }

}
