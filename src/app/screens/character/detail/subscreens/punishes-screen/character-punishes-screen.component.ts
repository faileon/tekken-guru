import { Component, OnInit } from '@angular/core';
import {TabService} from '../../../../../services/tab.service';
import {CharacterService} from '../../../../../services/character.service';
import {MoveService} from '../../../../../services/move.service';

@Component({
  selector: 'tg-character-punishes-screen',
  templateUrl: './character-punishes-screen.component.html',
  styleUrls: ['./character-punishes-screen.component.scss']
})
export class CharacterPunishesScreenComponent implements OnInit {

  constructor(private tabService: TabService, private characterService: CharacterService, private moveService: MoveService) {
  }

  ngOnInit(): void {
    this.tabService.setActiveTab('punishes');
  }

}
