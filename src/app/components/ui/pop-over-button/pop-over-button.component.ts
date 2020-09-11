import {Component, Input, OnInit} from '@angular/core';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'tg-pop-over-button',
  templateUrl: './pop-over-button.component.html',
  styleUrls: ['./pop-over-button.component.scss']
})
export class PopOverButtonComponent implements OnInit {

  public isOpen = true;

  @Input()
  public icon!: IconProp;

  constructor() {
  }

  ngOnInit(): void {
  }

}
