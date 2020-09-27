import {Component, EventEmitter, Input, Output} from '@angular/core';
import { MoveProperty} from '../../../../types';
import {getToggledProperties} from '../../../../utils/common';


@Component({
  selector: 'tg-move-properties-filter',
  templateUrl: './move-properties-filter.component.html',
  styleUrls: ['./move-properties-filter.component.scss']
})
export class MovePropertiesFilterComponent {

  @Input()
  public moveProperties!: MoveProperty[];

  @Output()
  public movePropertiesChange = new EventEmitter<MoveProperty[]>();


  public toggleProperty(property: MoveProperty): void {
    const toggleProperties = getToggledProperties(this.moveProperties, property, true);
    this.movePropertiesChange.emit(toggleProperties);
  }

}
