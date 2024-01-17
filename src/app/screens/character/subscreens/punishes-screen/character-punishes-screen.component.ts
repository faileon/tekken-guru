import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../../../services/character.service';
import { MovelistScreenComponent } from '../movelist-screen/movelist-screen.component';
import { ActivatedRoute } from '@angular/router';
import { MoveService } from '../../../../services/move.service';
import { map } from 'rxjs/operators';
import { GameService } from '../../../../services/game.service';

@Component({
  selector: 'tg-character-punishes-screen',
  templateUrl: './character-punishes-screen.component.html',
  styleUrls: ['./character-punishes-screen.component.scss'],
})
export class CharacterPunishesScreenComponent extends MovelistScreenComponent {
  constructor(
    route: ActivatedRoute,
    moveService: MoveService,
    gameService: GameService,
  ) {
    super(route, moveService, gameService);
    this.movelist$ = this.movelist$.pipe(
      map((moves) =>
        moves.filter(
          (move) => move.punishment?.isStanding || move.punishment?.isCrouching,
        ),
      ),
    );
  }
}
