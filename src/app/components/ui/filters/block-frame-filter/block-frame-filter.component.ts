import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LabelType, Options} from '@angular-slider/ngx-slider';
import {DEF_BLOCK_MAX_VAL, DEF_BLOCK_MIN_VAL} from '../../../../config/default-frames.config';
import {FilterType, HitProperty, NumberRange} from '../../../../types';
import {getDebouncedFilterRange, getToggledProperties} from '../../../../utils/common';


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

  @Input()
  public hitProperties!: HitProperty[];

  @Output()
  public hitPropertiesChange = new EventEmitter<HitProperty[]>();

  @Input()
  public blockFilterType!: FilterType;

  @Output()
  public blockFilterTypeChange = new EventEmitter<FilterType>();

  options: Options = {
    floor: DEF_BLOCK_MIN_VAL,
    ceil: DEF_BLOCK_MAX_VAL,
    animate: false,
    translate: (value, label) => {
      switch (label) {
        case LabelType.Low:
          return value <= DEF_BLOCK_MIN_VAL ? '-All' : `${value}`;
        case LabelType.High:
          return value >= DEF_BLOCK_MAX_VAL ? 'All' : `${value}`;
        default:
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

  public toggleCrouchProperty(): void {
    const toggleProperties = getToggledProperties(this.hitProperties, 'CROUCH');
    this.hitPropertiesChange.emit(toggleProperties);
  }

}
