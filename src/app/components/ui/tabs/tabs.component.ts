import {Component, Input, OnInit} from '@angular/core';
import {TGMenuItem} from '../../../types/ui.types';

@Component({
  selector: 'tg-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input()
  public tabs!: TGMenuItem[];

  ngOnInit(): void {
  }



}


