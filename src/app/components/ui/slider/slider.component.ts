import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ChangeContext, Options} from '@angular-slider/ngx-slider';
import {NumberRange} from '../../../types';

@Component({
  selector: 'tg-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  @Input()
  public range!: NumberRange;

  @Output()
  public rangeChange = new EventEmitter<NumberRange>();

  @Input()
  public options!: Options;

  public onRangeChange(ctx: ChangeContext): void {
    this.rangeChange.emit({from: ctx.value, to: ctx.highValue});
  }


}
