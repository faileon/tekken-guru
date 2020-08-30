import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {Character, CharacterParams, Move} from '../../../types';
import {CharacterService} from '../../../services/character.service';
import {Observable} from 'rxjs';
import {MoveService} from '../../../services/move.service';

@Component({
  selector: 'tg-character-detail-screen-component',
  templateUrl: './character-detail-screen-component.component.html',
  styleUrls: ['./character-detail-screen-component.component.scss']
})
export class CharacterDetailScreenComponentComponent implements OnInit {

  public selectedCharacter$?: Observable<Character | undefined>;
  public movelist$?: Observable<Move[]>;

  constructor(private route: ActivatedRoute, private characterService: CharacterService, private moveService: MoveService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      take(1),
    ).subscribe(params => {
      const _id = (params as CharacterParams).character;

      this.selectedCharacter$ = this.characterService.getSelectedCharacter$(_id);
      this.movelist$ = this.moveService.getMovelist(_id);

      // todo:
      //  gather all observables here.
      //  feed them to child components.
      //  subscribe to them, start and end loading each time they emit some new value
    });
  }
}
