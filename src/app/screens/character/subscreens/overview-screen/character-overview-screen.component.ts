import {Component, OnInit} from '@angular/core';
import {CharacterService} from '../../../../services/character.service';
import {ActivatedRoute} from '@angular/router';
import {Character} from '../../../../types';
import {BehaviorSubject, Observable} from 'rxjs';
import {getCharacterIdFromRoute, getRouteDataAndParams} from '../../../../utils/routing';
import {map} from 'rxjs/operators';

@Component({
  selector: 'tg-character-overview-screen',
  templateUrl: './character-overview-screen.component.html',
  styleUrls: ['./character-overview-screen.component.scss']
})
export class CharacterOverviewScreenComponent implements OnInit {

  public character$!: Observable<Character>;

  private _antiGuidesMap = new BehaviorSubject<AntiGuidesMap>({
    lidia: {
      movement: '<ul>' +
        '<li>Sidestepping: SWL block kills 2/3 of Lidias movelist so key is to SWL block a lot and watch out for moves that clip SWL and counter those</li>' +
        '<li>SWL loses to:  b2,3 / db2 / 1,2 strings on range clip SWL / 4 strings / df3+4 / b1,2 (kinda) / b4,4,4 / d3 strings / db4 /  CFSI / HaE / CFSII</li>' +
        '<li>Spacing: On range careful especially about wr1 but she has no big rangy threats; Generally best spacing is right beyond the range of her key pokes like db2 / ff2 / df4 - never let her get point blank on you she has i16 hellsweep (heavy keepout)</li>' +
        '</ul>',
      throwGame: '<ul>' +
        '<li><span>u/f+1+2</span></li>' +
        '</ul>'
    }
  });
  public antiGuidesMap$ = this._antiGuidesMap.asObservable();

  public characterAntiGuide$: Observable<AntiGuide>;

  constructor(private route: ActivatedRoute, private characterService: CharacterService) {
    const {data, params} = getRouteDataAndParams(route);
    const characterId = getCharacterIdFromRoute(data, params);

    this.character$ = this.characterService.getCharacter(characterId);

    // todo create collection with antiguide online
    this.characterAntiGuide$ = this.antiGuidesMap$.pipe(
      map(agMap => agMap[characterId])
    );
  }

  ngOnInit(): void {
  }

}

interface AntiGuidesMap {
  [charId: string]: AntiGuide;
}

interface AntiGuide {
  movement: string;
  throwGame: string;
}
