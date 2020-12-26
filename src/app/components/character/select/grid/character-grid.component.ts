import {Component, EventEmitter, Input, OnInit, Output, SkipSelf} from '@angular/core';
import {Character} from '../../../../types';
import {CharacterService} from '../../../../services/character.service';

@Component({
  selector: 'tg-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.scss']
})
export class CharacterGridComponent {
  public _selectedCharacters: Character[] = [];

  @Input()
  public withRouting = true;

  @Input()
  public characters?: Character[] | null;

  @Output()
  public characterSelected = new EventEmitter<Character>();

  constructor(@SkipSelf() private characterService: CharacterService) {
  }

  public onCharacterClick(character: Character): void {
    this.characterSelected.emit(character);
    this._selectedCharacters.push(character);
  }

  public onTextSearch(text: string): void {
    this.characterService.searchText = text;
  }
}
