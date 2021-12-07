import {Component, EventEmitter, Input, Output, SkipSelf} from '@angular/core';
import {Character} from '../../../../types';
import {CharacterService} from '../../../../services/character.service';
import {SettingsService} from '../../../../services/settings.service';

@Component({
  selector: 'tg-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.scss']
})
export class CharacterGridComponent {
  public _selectedCharacters: Character[] = [];

  @Input()
  public selectable = true;

  @Input()
  public withSearchbar = true;

  @Input()
  public withRouting = true;

  @Input()
  public characters?: Character[] | null;

  @Output()
  public characterSelected = new EventEmitter<Character>();

  constructor(@SkipSelf() public characterService: CharacterService, public settingService: SettingsService) {
  }

  public onCharacterClick(character: Character): void {
    this.characterSelected.emit(character);
    if (this.selectable) {
      this._selectedCharacters.push(character);
    }
  }

  public onTextSearch(text: string): void {
    this.characterService.searchText = text;
  }
}
