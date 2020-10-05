import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MoveService} from '../../../services/move.service';
import {Move} from '../../../types';
import {Observable} from 'rxjs';


@Component({
  selector: 'tg-movelist-screen',
  templateUrl: './movelist-screen.component.html',
  styleUrls: ['./movelist-screen.component.scss'],
  providers: [MoveService]
})
export class MovelistScreenComponent implements OnInit {
  public movelist$!: Observable<Move[]>;

  /**
   * This is a smart wrapper to provide moveservice to the child component, so we can have multiple of them on the same screen in the matchup view
   */
  constructor(private route: ActivatedRoute, private moveService: MoveService) {
    const {index} = route.snapshot.data as MovelistScreenSettings;
    const params = this.route.parent.snapshot.params;
    const characterId = Object.values(params)[index];

    this.movelist$ = this.moveService.getMovelist$(characterId);

  }

  ngOnInit(): void {
  }

}

export interface MovelistScreenSettings {
  index: number; // which character from route params to fetch
}
