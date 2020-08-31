import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {CharacterParams} from '../../../types';
import {CharacterService} from '../../../services/character.service';
import {Subject} from 'rxjs';
import {DEFAULT_CHARACTER_TABS} from '../../../utils/menu-constants';
import {TGMenuItem} from '../../../types/ui.types';

@Component({
  selector: 'tg-character-detail-screen-component',
  templateUrl: './character-detail-screen-component.component.html',
  styleUrls: ['./character-detail-screen-component.component.scss']
})
export class CharacterDetailScreenComponentComponent implements OnInit, OnDestroy {
  // private isDestroyed$: Subject<boolean> = new Subject<boolean>();
  public tabs: TGMenuItem[] = DEFAULT_CHARACTER_TABS;

  constructor(
    private route: ActivatedRoute,
    public characterService: CharacterService) {
    // subscribe to route params
    this.route.params.pipe(
      take(1),
    ).subscribe(params => {
      const {_id} = (params as CharacterParams);
      this.characterService.setSelectedCharacterById(_id);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this.isDestroyed$.next(true);
    // this.isDestroyed$.unsubscribe();
  }

}
