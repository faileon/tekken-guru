import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Options} from 'ng5-slider';

@Component({
  selector: 'tg-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  public isOpen = true;
  minValue = 10;
  maxValue = 16;
  options: Options = {
    floor: 10,
    ceil: 16,
    animate: false,
    translate: value => value >= 16 ? 'All' : `${value}`
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
