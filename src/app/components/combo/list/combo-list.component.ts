import {Component, Input, OnInit} from '@angular/core';
import {CategorizedCombo, Combo} from '../../../types/combo.type';

@Component({
  selector: 'tg-combo-list',
  templateUrl: './combo-list.component.html',
  styleUrls: ['./combo-list.component.scss']
})
export class ComboListComponent implements OnInit {

  @Input()
  public combolist!: Combo[];

  @Input()
  public categorizedCombos!: CategorizedCombo[];

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.categorizedCombos);
  }

}
