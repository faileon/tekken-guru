import {Component, OnInit} from '@angular/core';
import {TabService} from '../../../../../services/tab.service';

@Component({
  selector: 'tg-character-combos-screen',
  templateUrl: './character-combos-screen.component.html',
  styleUrls: ['./character-combos-screen.component.scss'],
})
export class CharacterCombosScreenComponent implements OnInit {

  constructor(private tabService: TabService) {
  }

  ngOnInit(): void {
    this.tabService.setActiveTab('combos');
  }



}
