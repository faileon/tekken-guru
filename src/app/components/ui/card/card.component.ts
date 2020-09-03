import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tg-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public title!: string;

  @Input()
  @HostBinding('class.fixed-height')
  public isFixedHeight = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
