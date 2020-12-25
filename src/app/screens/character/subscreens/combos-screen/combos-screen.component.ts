import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../../../../services/character.service';

@Component({
  selector: 'tg-character-combos-screen',
  templateUrl: './combos-screen.component.html',
  styleUrls: ['./combos-screen.component.scss'],
})
export class CombosScreenComponent implements OnInit {

  constructor(private characterService: CharacterService) {
  }

  ngOnInit(): void {
  }



}
