import {Component, OnInit} from '@angular/core';
import {Options} from 'ng5-slider';
import {DEF_BLOCK_MAX_VAL, DEF_BLOCK_MIN_VAL} from '../../../../config/default-frames.config';


@Component({
  selector: 'tg-block-frame-filter',
  templateUrl: './block-frame-filter.component.html',
  styleUrls: ['./block-frame-filter.component.scss']
})
export class BlockFrameFilterComponent implements OnInit {
  minValue = DEF_BLOCK_MIN_VAL;
  maxValue = DEF_BLOCK_MAX_VAL;
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

  constructor() {
  }

  ngOnInit(): void {

  }

  public setSafeFrames(): void {
    this.minValue = -9;
    this.maxValue = DEF_BLOCK_MAX_VAL;
  }

  public setPlusFrames(): void {
    this.minValue = 1;
    this.maxValue = DEF_BLOCK_MAX_VAL;
  }

}
