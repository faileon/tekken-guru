import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take, takeUntil} from 'rxjs/operators';
import {Character, CharacterParams, Move} from '../../../types';
import {CharacterService} from '../../../services/character.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {MoveService} from '../../../services/move.service';
import {TGTab} from '../../../types/ui.types';

@Component({
  selector: 'tg-character-detail-screen-component',
  templateUrl: './character-detail-screen-component.component.html',
  styleUrls: ['./character-detail-screen-component.component.scss']
})
export class CharacterDetailScreenComponentComponent implements OnInit, OnDestroy {

  public selectedCharacter$?: Observable<Character | undefined>;
  protected isDestroyed$: Subject<boolean> = new Subject<boolean>();

  public movelist$?: Observable<Move[]>;

  public _tabs: BehaviorSubject<TGTab[]> = new BehaviorSubject<TGTab[]>([
    {
      title: 'Moves',
      key: 'movelist',
      active: false,
    },
    {
      title: 'Key moves',
      key: 'keymoves',
      active: false,
    },
    {
      title: 'Combos',
      key: 'combos',
      active: false,
    },
    {
      title: 'Punishes',
      key: 'punishes',
      active: false,
    }, {
      title: 'Overview',
      key: 'overview',
      active: false,
    }

  ]);
  get tabs(): TGTab[] {
    return this._tabs.getValue();
  }

  set tabs(tabs: TGTab[]) {
    this._tabs.next(tabs);
  }

  get activeTab(): TGTab | undefined {
    return this.tabs.find(tab => tab.active);
  }

  public tabs$ = this._tabs.asObservable();

  constructor(private route: ActivatedRoute, private router: Router, private characterService: CharacterService, private moveService: MoveService) {
    this.route.params.pipe(
      take(1),
    ).subscribe(params => {
      const {_id, activeTab} = (params as CharacterParams);

      this.selectedCharacter$ = this.characterService.getSelectedCharacter$(_id);

      // configure active tab based on path parameter
      this.observeTabChanges(_id);
      this.tabs = this.tabs.map(tab => ({...tab, active: tab.key === activeTab}));

    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }

  /**
   * Observe tab changes. Based on active tab prepares the observable with data for child components;
   */
  private observeTabChanges(characterId: string): void {
    this.tabs$.pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe(tabs => {
      console.log('new tabs', tabs);
      if (this.activeTab) {
        this.getDataObservableFromActiveTab(this.activeTab.key, characterId);

        // todo navigate to active tab
        // this.router.navigate();
      }
    });
  }

  private getDataObservableFromActiveTab(activeTabKey: TGTab['key'], characterId: string): void {
    // todo:
    //  gather all observables here.
    //  feed them to child components.
    //  subscribe to them, start and end loading each time they emit some new value
    switch (activeTabKey) {
      case 'movelist':
        if (!this.movelist$) {
          console.log('getting movelist$ for', characterId);
          this.movelist$ = this.moveService.getMovelist$(characterId);
        }
        return;
      default:
        console.error('Unknown active tab, should redirect to movelist');
        return;
    }
  }

  public onTabSelected(selectedTab: TGTab): void {
    console.log('selected tab', selectedTab);
    this.tabs = this.tabs.map(tab => ({...tab, active: tab.key === selectedTab.key}));
  }


}
