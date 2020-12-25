import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoveService} from '../../../../services/move.service';
import {map} from 'rxjs/operators';
import {MovelistScreenComponent} from '../movelist-screen/movelist-screen.component';

@Component({
  selector: 'tg-key-moves-screen',
  templateUrl: './key-moves-screen.component.html',
  styleUrls: ['./key-moves-screen.component.scss']
})
export class KeyMovesScreenComponent extends MovelistScreenComponent {

  constructor(route: ActivatedRoute, moveService: MoveService) {
    super(route, moveService);
    this.movelist$ = this.movelist$.pipe(
      map(moves => moves.filter(move => move.isKeyMove))
    );
  }
}
