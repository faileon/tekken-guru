import { Component, OnInit } from '@angular/core';
import {TabService} from '../../../../../services/tab.service';
import {CharacterService} from '../../../../../services/character.service';
import {MoveService} from '../../../../../services/move.service';

@Component({
  selector: 'tg-character-key-moves-screen',
  templateUrl: './character-key-moves-screen.component.html',
  styleUrls: ['./character-key-moves-screen.component.scss']
})
export class CharacterKeyMovesScreenComponent implements OnInit {

  constructor(private tabService: TabService, private characterService: CharacterService, private moveService: MoveService) {
  }

  ngOnInit(): void {
    this.tabService.setActiveTab('keymoves');
  }

}
