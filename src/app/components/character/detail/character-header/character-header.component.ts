import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../../../services/game.service';
import { Character } from '../../../../types';

@Component({
  selector: 'tg-character-header',
  templateUrl: './character-header.component.html',
  styleUrls: ['./character-header.component.scss'],
})
export class CharacterHeaderComponent implements OnInit {
  @Input()
  public character!: Character;

  public selectedGame$ = this.gameService.selectedGame$;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}
}
