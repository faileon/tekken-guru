import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Options} from 'ng5-slider';
import {DEF_STARTUP_MAX_VAL, DEF_STARTUP_MIN_VAL} from '../../../../config/default-frames.config';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'tg-start-up-frame-filter',
  templateUrl: './start-up-frame-filter.component.html',
  styleUrls: ['./start-up-frame-filter.component.scss']
})
export class StartUpFrameFilterComponent implements OnInit {

  minValue = DEF_STARTUP_MIN_VAL;
  maxValue = DEF_STARTUP_MAX_VAL;

  public options: Options = {
    floor: DEF_STARTUP_MIN_VAL,
    ceil: DEF_STARTUP_MAX_VAL,
    animate: false,
    translate: value => value >= DEF_STARTUP_MAX_VAL ? '+All' : `${value}`
  };

  constructor() {
  }

  ngOnInit(): void {

  }

}
