import {Component, Input, OnInit} from '@angular/core';
import {IconProp, SizeProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'tg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input()
  public text?: string;

  @Input()
  public icon?: IconProp;

  @Input()
  public iconSize: SizeProp = 'lg';

  @Input()
  public outlined = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
