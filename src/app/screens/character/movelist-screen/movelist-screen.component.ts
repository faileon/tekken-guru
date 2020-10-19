import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoveService} from '../../../services/move.service';
import {Move} from '../../../types';
import {Observable} from 'rxjs';
import {getCharacterIdFromRoute} from '../../../utils/routing';


@Component({
  selector: 'tg-movelist-screen',
  templateUrl: './movelist-screen.component.html',
  styleUrls: ['./movelist-screen.component.scss'],
  providers: [MoveService] // todo this makes the service reset with each tab, consider bubbling it up to parent
})
export class MovelistScreenComponent implements OnInit {
  public movelist$!: Observable<Move[]>;

  /**
   * This is a smart wrapper to provide moveservice to the child component, so we can have multiple of them on the same screen in the matchup view
   */
  constructor(private route: ActivatedRoute, private moveService: MoveService) {
    const {data} = route.snapshot;
    const {params} = route.parent.snapshot;
    const characterId = getCharacterIdFromRoute(data, params);

    this.movelist$ = this.moveService.getMovelist$(characterId);

  }

  ngOnInit(): void {
  }

}


