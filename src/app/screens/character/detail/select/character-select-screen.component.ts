import { Component, OnInit, SkipSelf } from '@angular/core';
import { CharacterService } from '../../../../services/character.service';
import { Character } from '../../../../types';
import { Observable } from 'rxjs';
import { GameService } from '../../../../services/game.service';

@Component({
  selector: 'tg-character-select',
  templateUrl: './character-select-screen.component.html',
  styleUrls: ['./character-select-screen.component.scss'],
})
export class CharacterSelectScreenComponent {
  public characters$: Observable<Character[]>;
  public selectedGame = this.gameService.selectedGame$;

  constructor(
    @SkipSelf() public characterService: CharacterService,
    private gameService: GameService,
  ) {
    this.characters$ = this.characterService.getCharacters();
  }
}
