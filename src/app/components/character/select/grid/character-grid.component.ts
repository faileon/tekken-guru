import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character} from '../../../../types';

@Component({
  selector: 'tg-character-grid',
  templateUrl: './character-grid.component.html',
  styleUrls: ['./character-grid.component.scss']
})
export class CharacterGridComponent {
  /*
  todo remember:
  this is a dummy component, it sonly displays and emits. leave fetching and other to the parent (smart) component
  this will most likely be the screen directly.
   */

  @Input()
  public characters?: Character[] | null;

  @Output()
  public characterSelected = new EventEmitter<Character>();

  public onCharacterClick(character: Character): void {
    this.characterSelected.emit(character);
  }
}
