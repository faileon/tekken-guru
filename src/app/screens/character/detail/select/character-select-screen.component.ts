import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../../../../services/character.service';
import {Character} from '../../../../types';

@Component({
  selector: 'tg-character-select',
  templateUrl: './character-select-screen.component.html',
  styleUrls: ['./character-select-screen.component.scss']
})
export class CharacterSelectScreenComponent implements OnInit {

  constructor(public characterService: CharacterService) {
  }

  ngOnInit(): void {
  }

  public onCharacterSelected(character: Character): void {
    // console.log('selected', character);
  }

}
