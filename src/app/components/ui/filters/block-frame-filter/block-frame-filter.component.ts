import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Options} from 'ng5-slider';
import {DEF_BLOCK_MAX_VAL, DEF_BLOCK_MIN_VAL} from '../../../../config/default-frames.config';
import {NumberRange} from '../../../../types';
import {getDebouncedFilterRange} from '../../../../utils/common';


@Component({
  selector: 'tg-block-frame-filter',
  templateUrl: './block-frame-filter.component.html',
  styleUrls: ['./block-frame-filter.component.scss']
})
export class BlockFrameFilterComponent {
  @Input()
  public range!: NumberRange;

  @Output()
  public rangeChange = new EventEmitter<NumberRange>();

  options: Options = {
    floor: DEF_BLOCK_MIN_VAL,
    ceil: DEF_BLOCK_MAX_VAL,
    animate: false,
    translate: value => {
      if (value >= DEF_BLOCK_MAX_VAL) {
        return '+All';
      } else if (value <= DEF_BLOCK_MIN_VAL) {
        return '-All';
      } else {
        return `${value}`;
      }
    }
  };


  public setUnsafeFrames(): void {
    this.rangeChange.emit({from: DEF_BLOCK_MIN_VAL, to: -10});
  }

  public setSafeFrames(): void {
    this.rangeChange.emit({from: -9, to: DEF_BLOCK_MAX_VAL});
  }

  public setPlusFrames(): void {
    this.rangeChange.emit({from: 1, to: DEF_BLOCK_MAX_VAL});
  }

  public onRangeChange(range: NumberRange): void {
    getDebouncedFilterRange().then(() => {
      this.rangeChange.emit(range);
    });
  }

}
