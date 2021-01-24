import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LabelType, Options} from '@angular-slider/ngx-slider';
import {DEF_BLOCK_MAX_VAL, DEF_BLOCK_MIN_VAL, DEF_STARTUP_MAX_VAL, DEF_STARTUP_MIN_VAL} from '../../../../config/default-frames.config';
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
    translate: (value, label) => {
      switch (label) {
        case LabelType.High:
          return value >= DEF_STARTUP_MAX_VAL ? 'All' : `${value}`;
        default:
          return `${value}`;
      }
    }
  };

  public onRangeChange(range: NumberRange): void {
    getDebouncedFilterRange().then(() => {
      this.rangeChange.emit(range);
    });
  }

}
