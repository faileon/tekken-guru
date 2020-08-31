import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../../../../services/character.service';
import {MoveService} from '../../../../../services/move.service';

@Component({
  selector: 'tg-character-punishes-screen',
  templateUrl: './character-punishes-screen.component.html',
  styleUrls: ['./character-punishes-screen.component.scss']
})
export class CharacterPunishesScreenComponent implements OnInit {

  constructor(private characterService: CharacterService, private moveService: MoveService) {
  }

  ngOnInit(): void {
  }

}
