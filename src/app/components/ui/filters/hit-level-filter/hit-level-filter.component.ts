import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HitLevel} from '../../../../types';
import {getToggledProperties} from '../../../../utils/common';

@Component({
  selector: 'tg-hit-level-filter',
  templateUrl: './hit-level-filter.component.html',
  styleUrls: ['./hit-level-filter.component.scss']
})
export class HitLevelFilterComponent implements OnInit {

  @Input()
  public hitLevels!: HitLevel[];

  @Output()
  public hitLevelsChange = new EventEmitter<HitLevel[]>();

  ngOnInit(): void {
  }

  public toggleProperty(property: HitLevel): void {
    const toggleProperties = getToggledProperties(this.hitLevels, property, true);
    this.hitLevelsChange.emit(toggleProperties);
  }

}
