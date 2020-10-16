import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character} from '../../../../types';

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

  public onCharacterClick(character: Character): void {
    this.characterSelected.emit(character);
    this._selectedCharacters.push(character);
  }

  public onTextSearch(text: string): void {
    console.log('searching for', text);
  }
}
