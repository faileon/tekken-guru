import {Component, Input, OnInit} from '@angular/core';
import {Move} from '../../../types';

@Component({
  selector: 'tg-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss']
})
export class MoveListComponent implements OnInit {

  @Input()
  public moves!: Move[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
