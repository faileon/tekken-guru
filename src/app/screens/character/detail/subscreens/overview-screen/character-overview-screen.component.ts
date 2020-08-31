import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../../../../services/character.service';
import {MoveService} from '../../../../../services/move.service';

@Component({
  selector: 'tg-character-overview-screen',
  templateUrl: './character-overview-screen.component.html',
  styleUrls: ['./character-overview-screen.component.scss']
})
export class CharacterOverviewScreenComponent implements OnInit {

  constructor(private characterService: CharacterService, private moveService: MoveService) {
  }

  ngOnInit(): void {
  }

}
