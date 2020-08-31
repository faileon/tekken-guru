import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../../../../../services/character.service';
import {MoveService} from '../../../../../services/move.service';

@Component({
  selector: 'tg-character-combos-screen',
  templateUrl: './character-combos-screen.component.html',
  styleUrls: ['./character-combos-screen.component.scss'],
})
export class CharacterCombosScreenComponent implements OnInit {

  constructor(private characterService: CharacterService, private moveService: MoveService) {
  }

  ngOnInit(): void {
  }



}
