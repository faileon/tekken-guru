import {Injectable} from '@angular/core';
import {CharacterService} from './character.service';
import {Observable} from 'rxjs';
import {CategorizedCombo, Combo} from '../types/combo.type';
import {filter, map} from 'rxjs/operators';

@Injectable()
export class CombosService {

  constructor(private characterService: CharacterService) {
  }

  public getCombos$(characterId: string): Observable<Combo[]> {
    // now just useless proxy, but just in case we need filters and others for combos (like in move.service), I am laying down proper infrastructure
    return this.characterService.getCombos(characterId).pipe(
      filter((combos) => !!combos)
    );
  }

  public getCategorizedCombos$(characterId: string): Observable<CategorizedCombo[]> {
    return this.getCombos$(characterId).pipe(
      map(combos => {
        return combos.reduce((acc, curr) => {
          // does the category already exist?
          const categoryIdx = acc.findIndex(category => category.name === curr.category);

          // category already exists
          if (categoryIdx >= 0) {
            acc[categoryIdx].data.push(curr);
          } else {
            // category does not exist yet,
            acc.push({
              name: curr.category,
              data: [curr]
            });
          }
          return acc;
        }, [] as CategorizedCombo[]);
      })
    );
  }
}





