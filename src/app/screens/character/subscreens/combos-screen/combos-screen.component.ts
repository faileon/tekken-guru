import {Component, HostBinding, OnInit, SkipSelf} from '@angular/core';
import {CharacterService} from '../../../../services/character.service';
import {CombosService} from '../../../../services/combos.service';
import {Observable} from 'rxjs';
import {CategorizedCombo, Combo} from '../../../../types/combo.type';
import {getCharacterIdFromRoute} from '../../../../utils/routing';
import {ActivatedRoute} from '@angular/router';
import {MoveService} from '../../../../services/move.service';

@Component({
  selector: 'tg-character-combos-screen',
  templateUrl: './combos-screen.component.html',
  styleUrls: ['./combos-screen.component.scss'],
})
export class CombosScreenComponent implements OnInit {
  @HostBinding('class')
  public classes = 'subscreen';

  public combos$: Observable<Combo[]>;
  public categorizedCombos$: Observable<CategorizedCombo[]>;

  constructor(private route: ActivatedRoute, @SkipSelf() public combosService: CombosService) {
    const {data} = route.snapshot;
    const {params} = route.parent.snapshot;
    const characterId = getCharacterIdFromRoute(data, params);

    // this.combos$ = this.combosService.getCombos$(characterId);
    this.categorizedCombos$ = this.combosService.getCategorizedCombos$(characterId);
  }

  ngOnInit(): void {
  }
}
