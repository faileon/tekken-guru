import { Component, HostBinding, SkipSelf } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoveService } from '../../../../services/move.service';
import { Move } from '../../../../types';
import { Observable } from 'rxjs';
import { getCharacterIdFromRoute } from '../../../../utils/routing';
import { GameService } from '../../../../services/game.service';

@Component({
  selector: 'tg-movelist-screen',
  templateUrl: './movelist-screen.component.html',
  styleUrls: ['./movelist-screen.component.scss'],
})
export class MovelistScreenComponent {
  @HostBinding('class')
  public classes = 'subscreen';

  public movelist$!: Observable<Move[]>;

  public selectedGame$ = this.gameService.selectedGame$;

  constructor(
    private route: ActivatedRoute,
    @SkipSelf() private moveService: MoveService,
    private gameService: GameService,
  ) {
    const { data } = this.route.snapshot;
    const { params } = route.parent.snapshot;
    const characterId = getCharacterIdFromRoute(data, params);

    this.movelist$ = this.moveService.getMovelist$(characterId);
  }
}
