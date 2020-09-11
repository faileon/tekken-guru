import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../../../../../services/character.service';

@Component({
  selector: 'tg-character-overview-screen',
  templateUrl: './character-overview-screen.component.html',
  styleUrls: ['./character-overview-screen.component.scss']
})
export class CharacterOverviewScreenComponent implements OnInit {

  constructor(private characterService: CharacterService) {
  }

  ngOnInit(): void {
  }

}
