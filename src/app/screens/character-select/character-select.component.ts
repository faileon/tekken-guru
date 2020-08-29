import {Component, OnInit} from '@angular/core';
import {Character} from '../../types';
import {CharacterService} from '../../services/character.service';

@Component({
  selector: 'tg-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.scss']
})
export class CharacterSelectComponent implements OnInit {

  constructor(public characterService: CharacterService) {
  }

  ngOnInit(): void {
  }

  public onCharacterSelected(character: Character): void {
    console.log('selected', character);
  }
}
