import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';
import {DEF_COUNTER_MAX_VAL, DEF_COUNTER_MIN_VAL} from '../../../../config/default-frames.config';
import {HitProperty, NumberRange} from '../../../../types';
import {getDebouncedFilterRange, getToggleProperties} from '../../../../utils/common';


@Component({
  selector: 'tg-counter-frame-filter',
  templateUrl: './counter-frame-filter.component.html',
  styleUrls: ['./counter-frame-filter.component.scss']
})
export class CounterFrameFilterComponent {
  @Input()
  public range!: NumberRange;

  @Output()
  public rangeChange = new EventEmitter<NumberRange>();

  @Input()
  public hitProperties!: HitProperty[];

  @Output()
  public hitPropertiesChange = new EventEmitter<HitProperty[]>();

  options: Options = {
    floor: DEF_COUNTER_MIN_VAL,
    ceil: DEF_COUNTER_MAX_VAL,
    animate: false,
    translate: (value, label) => {
      switch (label) {
        case LabelType.Low:
          return value <= DEF_COUNTER_MIN_VAL ? '-All' : `${value}`;
        case LabelType.High:
          return value >= DEF_COUNTER_MAX_VAL ? 'All' : `${value}`;
        default:
          return `${value}`;
      }
    }
  };


  public setMinusFrames(): void {
    this.rangeChange.emit({from: DEF_COUNTER_MIN_VAL, to: -1});
  }

  public setNeutralFrames(): void {
    this.rangeChange.emit({from: 0, to: 0});
  }

  public setPlusFrames(): void {
    this.rangeChange.emit({from: 1, to: DEF_COUNTER_MAX_VAL});
  }

  public onRangeChange(range: NumberRange): void {
    getDebouncedFilterRange().then(() => {
      this.rangeChange.emit(range);
    });
  }

  public toggleKnockDownProperty(): void {
    this.toggleProperty('KND');
  }

  public toggleLaunchProperty(): void {
    this.toggleProperty('LAUNCH');
  }

  public toggleCrouchProperty(): void {
    this.toggleProperty('CROUCH');
  }

  private toggleProperty(property: HitProperty): void {
    const toggleProperties = getToggleProperties(this.hitProperties, property);
    this.hitPropertiesChange.emit(toggleProperties);
  }

}
