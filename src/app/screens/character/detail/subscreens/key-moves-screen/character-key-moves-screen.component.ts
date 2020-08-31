import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../../../../services/character.service';
import {MoveService} from '../../../../../services/move.service';

@Component({
  selector: 'tg-character-key-moves-screen',
  templateUrl: './character-key-moves-screen.component.html',
  styleUrls: ['./character-key-moves-screen.component.scss']
})
export class CharacterKeyMovesScreenComponent implements OnInit {

  constructor(private characterService: CharacterService, private moveService: MoveService) {
  }

  ngOnInit(): void {
  }

}
