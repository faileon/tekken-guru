import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tg-card-with-actions',
  templateUrl: './card-with-actions.component.html',
  styleUrls: ['./card-with-actions.component.scss']
})
export class CardWithActionsComponent implements OnInit {

  @Input()
  public isFixedHeight = false;

  @Input()
  public title!: string;

  @Input()
  public subtitle!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
