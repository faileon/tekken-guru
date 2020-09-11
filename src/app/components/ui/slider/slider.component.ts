import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Options} from 'ng5-slider';

@Component({
  selector: 'tg-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input()
  public minValue!: number;

  @Input()
  public maxValue!: number;

  @Input()
  public options!: Options;

  constructor() {
  }

  ngOnInit(): void {

  }

}
