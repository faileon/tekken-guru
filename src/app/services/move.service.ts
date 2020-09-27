import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {HitProperty, Move, NumberRange} from '../types';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {
  filterByHitProperty,
  filterByRange,
  shouldFilterBlockFrame,
  shouldFilterByHitProperties, shouldFilterCounterFrame,
  shouldFilterNormalFrame,
  shouldFilterStartupFrame
} from '../utils/query-filters';
import {
  DEF_BLOCK_MAX_VAL,
  DEF_BLOCK_MIN_VAL, DEF_COUNTER_MAX_VAL, DEF_COUNTER_MIN_VAL,
  DEF_NORMAL_MAX_VAL,
  DEF_NORMAL_MIN_VAL,
  DEF_STARTUP_MAX_VAL,
  DEF_STARTUP_MIN_VAL
} from '../config/default-frames.config';

@Injectable()
export class MoveService implements OnDestroy {

  /********************
   * FRAME FILTERS:
   *********************/
  private _startUpFilter: BehaviorSubject<NumberRange>;
  public startupFilter$: Observable<NumberRange>;

  private _blockFilter: BehaviorSubject<NumberRange>;
  public blockFilter$: Observable<NumberRange>;

  private _normalFilter: BehaviorSubject<NumberRange>;
  public normalFilter$: Observable<NumberRange>;

  private _counterFilter: BehaviorSubject<NumberRange>;
  public counterFilter$: Observable<NumberRange>;

  /********************
   * HIT PROPERTIES FILTER
   *********************/
  private _normalProps: BehaviorSubject<HitProperty[]>;
  public normalProps$: Observable<HitProperty[]>;

  private _counterProps: BehaviorSubject<HitProperty[]>;
  public counterProps$: Observable<HitProperty[]>;

  /********************
   * MOVE HIT PROPERTIES:
   *********************/
  // todo

  /********************
   * ACTIVE FILTERS COUNT:
   *********************/
  private _activeFiltersCount: BehaviorSubject<number>;
  public activeFiltersCount$: Observable<number>;

  /********************
   * SUBJECT SETTERS:
   *********************/
  set startUpFilter(range: NumberRange) {
    this._startUpFilter.next(range);
  }

  set blockFilter(range: NumberRange) {
    this._blockFilter.next(range);
  }

  set normalFilter(range: NumberRange) {
    this._normalFilter.next(range);
  }

  set normalProps(properties: HitProperty[]) {
    this._normalProps.next(properties);
  }

  set counterFilter(range: NumberRange) {
    this._counterFilter.next(range);
  }

  set counterProps(properties: HitProperty[]) {
    this._counterProps.next(properties);
  }

  set activeFiltersCount(count: number) {
    this._activeFiltersCount.next(count);
  }

  constructor(private firestore: AngularFirestore) {
    this._startUpFilter = new BehaviorSubject({from: DEF_STARTUP_MIN_VAL, to: DEF_STARTUP_MAX_VAL} as NumberRange);
    this.startupFilter$ = this._startUpFilter.asObservable();

    this._blockFilter = new BehaviorSubject<NumberRange>({from: DEF_BLOCK_MIN_VAL, to: DEF_BLOCK_MAX_VAL} as NumberRange);
    this.blockFilter$ = this._blockFilter.asObservable();

    this._normalFilter = new BehaviorSubject<NumberRange>({from: DEF_NORMAL_MIN_VAL, to: DEF_NORMAL_MAX_VAL} as NumberRange);
    this.normalFilter$ = this._normalFilter.asObservable();

    this._counterFilter = new BehaviorSubject<NumberRange>({from: DEF_COUNTER_MIN_VAL, to: DEF_COUNTER_MAX_VAL} as NumberRange);
    this.counterFilter$ = this._counterFilter.asObservable();

    this._normalProps = new BehaviorSubject<HitProperty[]>([]);
    this.normalProps$ = this._normalProps.asObservable();

    this._counterProps = new BehaviorSubject<HitProperty[]>([]);
    this.counterProps$ = this._counterProps.asObservable();

    this._activeFiltersCount = new BehaviorSubject(0);
    this.activeFiltersCount$ = this._activeFiltersCount.asObservable();
  }

  public getMovelist$(characterId: string): Observable<Move[]> {
    return combineLatest([
      this.startupFilter$,
      this.blockFilter$,
      this.normalFilter$,
      this.counterFilter$,
      this.normalProps$,
      this.counterProps$
    ])
      .pipe(
        switchMap(([
                     startUpRange,
                     blockRange,
                     normalRange,
                     counterRange,
                     normalProps,
                     counterProps,
                   ]) =>
          this.firestore.collection<Move>(`characters/${characterId}/movelist`)
            .valueChanges({idField: '_id'})
            .pipe(
              map(moves => {
                /*console.table({
                  startUp: startUpRange,
                  block: blockRange,
                  normal: normalRange,
                  counter: counterRange,
                });
                console.table({
                  propsNormal: normalProps,
                  propsCounter: counterProps
                });*/

                // init active filters
                let activeFilters = 0;

                // fixme for now readability > time complexity
                //  deal with optimization later if it turns out to be an issue - merge the filters and just filter it once
                if (shouldFilterStartupFrame(startUpRange)) {
                  moves = filterByRange<Move>(moves, 'frames.startUp', startUpRange, DEF_STARTUP_MIN_VAL, DEF_STARTUP_MAX_VAL);
                  activeFilters++;
                }

                if (shouldFilterBlockFrame(blockRange)) {
                  moves = filterByRange<Move>(moves, 'frames.onBlock', blockRange, DEF_BLOCK_MIN_VAL, DEF_BLOCK_MAX_VAL);
                  activeFilters++;
                }

                if (shouldFilterNormalFrame(normalRange)) {
                  moves = filterByRange<Move>(moves, 'frames.onHit', normalRange, DEF_NORMAL_MIN_VAL, DEF_NORMAL_MAX_VAL);
                  activeFilters++;
                }

                if (shouldFilterCounterFrame(counterRange)) {
                  moves = filterByRange<Move>(moves, 'frames.onCounterHit', counterRange, DEF_COUNTER_MIN_VAL, DEF_COUNTER_MAX_VAL);
                  activeFilters++;
                }

                if (shouldFilterByHitProperties(normalProps)) {
                  moves = filterByHitProperty(moves, 'hit.onHit', normalProps);
                  activeFilters++;
                }

                if (shouldFilterByHitProperties(counterProps)) {
                  moves = filterByHitProperty(moves, 'hit.onCounterHit', counterProps);
                  activeFilters++;
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
