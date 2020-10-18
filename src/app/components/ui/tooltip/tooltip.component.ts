import {Component, Inject, InjectionToken, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tg-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  @Input()
  public text!: string;

  constructor(@Inject(TOOLTIP_INJECTION_TOKEN) public injectedText: string) {
    this.text = injectedText;
  }

  ngOnInit(): void {
  }

}

export const TOOLTIP_INJECTION_TOKEN = new InjectionToken<string>('TOOLTIP_INJECTION_TOKEN');
