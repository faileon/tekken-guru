import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TGTab} from '../../../types/ui.types';

@Component({
  selector: 'tg-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input()
  public tabs!: TGTab[];

  @Output()
  public tabSelected: EventEmitter<TGTab> = new EventEmitter<TGTab>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onTabClicked(tab: TGTab): void {
    this.tabSelected.emit(tab);
  }

}


