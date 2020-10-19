import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../../../../../services/character.service';
import {ActivatedRoute} from '@angular/router';
import {MoveService} from '../../../../../services/move.service';
import {Character, CharacterParams, CharacterSubscreenSettings} from '../../../../../types';
import {Observable} from 'rxjs';
import {getCharacterIdFromRoute} from '../../../../../utils/routing';

@Component({
  selector: 'tg-character-overview-screen',
  templateUrl: './character-overview-screen.component.html',
  styleUrls: ['./character-overview-screen.component.scss']
})
export class CharacterOverviewScreenComponent implements OnInit {

  public character$!: Observable<Character>;

  constructor(private route: ActivatedRoute, private characterService: CharacterService) {
    const {data} = route.snapshot;
    const {params} = route.parent.snapshot;
    const characterId = getCharacterIdFromRoute(data, params);

    this.character$ = this.characterService.getCharacter(characterId);
    this.character$.subscribe(char => console.log('char', char));
  }

  ngOnInit(): void {
  }

}
