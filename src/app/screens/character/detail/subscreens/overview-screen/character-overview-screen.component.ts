import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../../../../../services/character.service';
import {ActivatedRoute} from '@angular/router';
import {MoveService} from '../../../../../services/move.service';
import {Character, CharacterParams, MovelistScreenSettings} from '../../../../../types';
import {Observable} from 'rxjs';

@Component({
  selector: 'tg-character-overview-screen',
  templateUrl: './character-overview-screen.component.html',
  styleUrls: ['./character-overview-screen.component.scss']
})
export class CharacterOverviewScreenComponent implements OnInit {

  public character$!: Observable<Character>;

  constructor(private route: ActivatedRoute, private characterService: CharacterService) {
    const params = this.route.parent.snapshot.params as CharacterParams;
    const {_id} = params;

    this.character$ = this.characterService.getCharacter(_id);
    this.character$.subscribe(char => console.log('char', char));
  }

  ngOnInit(): void {
  }

}
