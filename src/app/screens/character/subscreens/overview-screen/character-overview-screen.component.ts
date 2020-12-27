import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../../../../services/character.service';
import {ActivatedRoute} from '@angular/router';
import {Character} from '../../../../types';
import {Observable} from 'rxjs';
import {getCharacterIdFromRoute, getRouteDataAndParams} from '../../../../utils/routing';

@Component({
  selector: 'tg-character-overview-screen',
  templateUrl: './character-overview-screen.component.html',
  styleUrls: ['./character-overview-screen.component.scss']
})
export class CharacterOverviewScreenComponent implements OnInit {

  public character$!: Observable<Character>;

  constructor(private route: ActivatedRoute, private characterService: CharacterService) {
    const {data, params} = getRouteDataAndParams(route);
    const characterId = getCharacterIdFromRoute(data, params);

    this.character$ = this.characterService.getCharacter(characterId);
  }

  ngOnInit(): void {
  }

}
