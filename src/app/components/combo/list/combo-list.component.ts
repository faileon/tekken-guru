import {Component, Input, OnInit} from '@angular/core';
import {Combo} from '../../../types/combo.type';

@Component({
  selector: 'tg-combo-list',
  templateUrl: './combo-list.component.html',
  styleUrls: ['./combo-list.component.scss']
})
export class ComboListComponent implements OnInit {

  @Input()
  public combolist!: Combo[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
