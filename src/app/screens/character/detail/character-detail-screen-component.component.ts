import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, switchMap, take, takeUntil} from 'rxjs/operators';
import {Character, CharacterParams, Move} from '../../../types';
import {CharacterService} from '../../../services/character.service';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {MoveService} from '../../../services/move.service';
import {TGTab} from '../../../types/ui.types';
import {TabService} from '../../../services/tab.service';

@Component({
  selector: 'tg-character-detail-screen-component',
  templateUrl: './character-detail-screen-component.component.html',
  styleUrls: ['./character-detail-screen-component.component.scss']
})
export class CharacterDetailScreenComponentComponent implements OnInit, OnDestroy {

  private isDestroyed$: Subject<boolean> = new Subject<boolean>();

  public movelist$?: Observable<Move[]>;

  constructor(
    public tabService: TabService,
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
    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }

/*  /!**
   * Observe tab changes. Based on active tab prepares the observable with data for child components;
   *!/
  private observeTabChanges(characterId: string): void {
    this.tabService.characterTabs$.pipe(
      takeUntil(this.isDestroyed$),
      map(tabs => tabs.filter(tab => tab.active)[0]),
      filter(tab => tab !== undefined)
    ).subscribe(tab => {
      console.log('active tab', tab.routeTo);
      this.getDataObservableFromActiveTab(tab.routeTo, characterId);
    });
  }

  private getDataObservableFromActiveTab(activeTab: TGTab['routeTo'], characterId: string): void {
    switch (activeTab) {
      case 'movelist':
        if (!this.movelist$) {
          console.log('getting movelist$ for', characterId);
          this.movelist$ = this.moveService.getMovelist$(characterId);
        }
        return;
      case 'combos':
        // todo set combos$
        break;
      case 'keymoves':
        // todo set keymoves$
        break;
      case 'overview':
        // todo set overview$
        break;
      case 'punishes':
        // todo set punishes$
        break;
      default:
        console.error(`Unknown active tab ${activeTab}.`);
        return;
    }
  }*/

}
