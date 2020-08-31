import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {TGTab} from '../types/ui.types';
import {DEFAULT_CHARACTER_TABS} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  private _characterTabs!: Subject<TGTab[]>;

  public characterTabs$!: Observable<TGTab[]>;

  constructor() {
    this._characterTabs = new Subject<TGTab[]>();
    this.characterTabs$ = this._characterTabs.asObservable();
  }

  public setActiveTab(activeRoute: TGTab['routeTo']): void {
    // create new tabs with new active value
    const newTabs = DEFAULT_CHARACTER_TABS.map(tab => {
      return {
        ...tab,
        active: tab.routeTo === activeRoute
      };
    });
    // emit it
    this._characterTabs.next(newTabs);
  }
}
