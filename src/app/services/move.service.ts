import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Move, NumberRange} from '../types';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {filterByRange} from '../utils/query-filters';
import {DEF_BLOCK_MAX_VAL, DEF_BLOCK_MIN_VAL, DEF_STARTUP_MAX_VAL, DEF_STARTUP_MIN_VAL} from '../config/default-frames.config';

@Injectable()
export class MoveService implements OnDestroy {

  private _startUpFilter: BehaviorSubject<NumberRange>;
  public startupFilter$: Observable<NumberRange>;

  private _blockFilter: BehaviorSubject<NumberRange>;
  public blockFilter$: Observable<NumberRange>;

  private _activeFiltersCount: BehaviorSubject<number>;
  public activeFiltersCount$: Observable<number>;

  set startUpFilter(range: NumberRange) {
    this._startUpFilter.next(range);
  }

  set blockFilter(range: NumberRange) {
    this._blockFilter.next(range);
  }

  set activeFiltersCount(count: number) {
    this._activeFiltersCount.next(count);
  }

  constructor(private firestore: AngularFirestore) {
    this._startUpFilter = new BehaviorSubject({from: DEF_STARTUP_MIN_VAL, to: DEF_STARTUP_MAX_VAL} as NumberRange);
    this.startupFilter$ = this._startUpFilter.asObservable();

    this._blockFilter = new BehaviorSubject<NumberRange>({from: DEF_BLOCK_MIN_VAL, to: DEF_BLOCK_MAX_VAL} as NumberRange);
    this.blockFilter$ = this._blockFilter.asObservable();

    this._activeFiltersCount = new BehaviorSubject(0);
    this.activeFiltersCount$ = this._activeFiltersCount.asObservable();
  }

  public getMovelist$(characterId: string): Observable<Move[]> {
    return combineLatest([
      this.startupFilter$,
      this.blockFilter$
    ]).pipe(
      switchMap(([startUpRange, blockRange]) =>
        this.firestore.collection<Move>(`characters/${characterId}/movelist`)
          .valueChanges({idField: '_id'}).pipe(
          map(moves => {
            console.table({startUp: startUpRange, block: blockRange});
            let activeFilters = 0;
            // in memory filtering because firebase sucks monkey balls
            if (startUpRange.from !== DEF_STARTUP_MIN_VAL || startUpRange.to !== DEF_STARTUP_MAX_VAL) {
              moves = filterByRange<Move>(moves, 'frames.startUp', startUpRange);
              activeFilters += 1;
            }

            if (blockRange.from !== DEF_BLOCK_MIN_VAL || blockRange.to !== DEF_BLOCK_MAX_VAL) {
              moves = filterByRange<Move>(moves, 'frames.onBlock', blockRange);
              activeFilters += 1;
            }

            // set number of active filters
            this.activeFiltersCount = activeFilters;
            return moves;
          })
        )
      )
    );
  }

  ngOnDestroy(): void {
    console.log('moveservice destroyed');
  }
}
