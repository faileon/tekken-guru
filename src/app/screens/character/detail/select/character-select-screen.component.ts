import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../../../../services/character.service';
import {Character} from '../../../../types';
import {Observable} from 'rxjs';

@Component({
  selector: 'tg-character-select',
  templateUrl: './character-select-screen.component.html',
  styleUrls: ['./character-select-screen.component.scss']
})
export class CharacterSelectScreenComponent implements OnInit {

  public characters$: Observable<Character[]>;

  constructor(public characterService: CharacterService) {
    this.characters$ = this.characterService.getCharacters();
  }

  ngOnInit(): void {
  }

  public onCharacterSelected(character: Character): void {
    // console.log('selected', character);
  }

}
