import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FilterType, NumberRange} from '../../../../types';
import {Options} from '@angular-slider/ngx-slider';

@Component({
  selector: 'tg-filter-template',
  templateUrl: './filter-template.component.html',
  styleUrls: ['./filter-template.component.scss']
})
export class FilterTemplateComponent implements OnInit {

  @Input()
  public title!: string;

  @Input()
  public sliderOptions?: Options;

  @Input()
  public range?: NumberRange;

  @Output()
  public rangeChange = new EventEmitter<NumberRange>();


  @Input()
  public filterType?: FilterType;

  @Output()
  public filterTypeChange = new EventEmitter<FilterType>();

  @ViewChild('hitPropsPresets', {static: true})
  public hitPropsPresets: ElementRef<HTMLElement>;
  public showHitPropsPresets = false;

  @ViewChild('framePresets', {static: true})
  public framePresets: ElementRef<HTMLElement>;
  public showFramePresets = false;

  constructor() {
  }

  ngOnInit(): void {
    this.showHitPropsPresets = this.hitPropsPresets.nativeElement?.children.length > 0 ?? false;
    this.showFramePresets = this.framePresets.nativeElement?.children.length > 0 ?? false;

  }

}
