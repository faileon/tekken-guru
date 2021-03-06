import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LabelType, Options} from '@angular-slider/ngx-slider';
import {DEF_NORMAL_MAX_VAL, DEF_NORMAL_MIN_VAL} from '../../../../config/default-frames.config';
import {FilterType, HitProperty, NumberRange} from '../../../../types';
import {getDebouncedFilterRange, getToggledProperties} from '../../../../utils/common';


@Component({
  selector: 'tg-normal-frame-filter',
  templateUrl: './normal-frame-filter.component.html',
  styleUrls: ['./normal-frame-filter.component.scss']
})
export class NormalFrameFilterComponent {
  @Input()
  public range!: NumberRange;

  @Output()
  public rangeChange = new EventEmitter<NumberRange>();

  @Input()
  public hitProperties!: HitProperty[];

  @Output()
  public hitPropertiesChange = new EventEmitter<HitProperty[]>();

  @Input()
  public hitFilterType!: FilterType;

  @Output()
  public hitFilterTypeChange = new EventEmitter<FilterType>();

  options: Options = {
    floor: DEF_NORMAL_MIN_VAL,
    ceil: DEF_NORMAL_MAX_VAL,
    animate: false,
    translate: (value, label) => {
      switch (label) {
        case LabelType.Low:
          return value <= DEF_NORMAL_MIN_VAL ? '-All' : `${value}`;
        case LabelType.High:
          return value >= DEF_NORMAL_MAX_VAL ? 'All' : `${value}`;
        default:
          return `${value}`;
      }
    }
  };


  public setMinusFrames(): void {
    this.rangeChange.emit({from: DEF_NORMAL_MIN_VAL, to: -1});
  }

  public setNeutralFrames(): void {
    this.rangeChange.emit({from: 0, to: 0});
  }

  public setPlusFrames(): void {
    this.rangeChange.emit({from: 1, to: DEF_NORMAL_MAX_VAL});
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
    const toggleProperties = getToggledProperties(this.hitProperties, property);
    this.hitPropertiesChange.emit(toggleProperties);
  }

}
