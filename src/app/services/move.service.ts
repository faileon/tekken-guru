import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {HitProperty, Move, MoveProperty, NumberRange} from '../types';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {
  satisfiesPropertyFilter,
  satisfiesRangeFilter,
  shouldFilterBlockFrame,
  shouldFilterByProperties, shouldFilterCounterFrame,
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
  private _moveProps: BehaviorSubject<MoveProperty[]>;
  public moveProps$: Observable<MoveProperty[]>;

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

  set moveProps(properties: MoveProperty[]) {
    this._moveProps.next(properties);
  }

  set activeFiltersCount(count: number) {
    this._activeFiltersCount.next(count);
  }

  get activeFiltersCount(): number {
    return this._activeFiltersCount.getValue();
  }

  constructor(private firestore: AngularFirestore) {
    console.log('moveservice created');

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

    this._moveProps = new BehaviorSubject<MoveProperty[]>([]);
    this.moveProps$ = this._moveProps.asObservable();

    this._activeFiltersCount = new BehaviorSubject(0);
    this.activeFiltersCount$ = this._activeFiltersCount.asObservable();
  }

  public getMovelist$(characterId: string): Observable<Move[]> {
    return combineLatest([
      combineLatest([
        this.startupFilter$,
        this.blockFilter$,
        this.normalFilter$,
        this.counterFilter$,
      ]),
      combineLatest([
        this.normalProps$,
        this.counterProps$,
        this.moveProps$
      ])
    ])
      .pipe(
        switchMap(([
                     [
                       startUpRange,
                       blockRange,
                       normalRange,
                       counterRange
                     ],
                     [
                       normalProps,
                       counterProps,
                       moveProps
                     ]
                   ]) =>
          this.firestore.collection<Move>(`characters/${characterId}/movelist`)
            .valueChanges({idField: '_id'})
            .pipe(
              map(moves => {
                // determine what will be filtered
                const byStartupFrame = shouldFilterStartupFrame(startUpRange);
                const byNormalFrame = shouldFilterNormalFrame(normalRange);
                const byCounterFrame = shouldFilterCounterFrame(counterRange);
                const byBlockFrame = shouldFilterBlockFrame(blockRange);
                const byNormalProps = shouldFilterByProperties<HitProperty>(normalProps);
                const byCounterProps = shouldFilterByProperties<HitProperty>(counterProps);
                const byMoveProps = shouldFilterByProperties<MoveProperty>(moveProps);

                // calculate the number of active filters
                this.activeFiltersCount = [
                  byStartupFrame,
                  byNormalFrame,
                  byCounterFrame,
                  byBlockFrame,
                  byNormalProps,
                  byCounterProps,
                  byMoveProps
                ].filter(f => f).length;

                // no filter, just return everything
                if (this.activeFiltersCount === 0) {
                  // return [moves[0]];
                  return moves;
                }

                // filter moves
                return moves.filter(move => {
                  const satisfiesFilter: boolean[] = [];
                  const {startUp, onHit, onCounterHit, onBlock} = move.frames;

                  if (byStartupFrame) {
                    satisfiesFilter.push(satisfiesRangeFilter(startUpRange, startUp, DEF_STARTUP_MIN_VAL, DEF_STARTUP_MAX_VAL));
                  }

                  if (byNormalFrame) {
                    satisfiesFilter.push(satisfiesRangeFilter(normalRange, onHit, DEF_NORMAL_MIN_VAL, DEF_NORMAL_MAX_VAL));
                  }

                  if (byCounterFrame) {
                    satisfiesFilter.push(satisfiesRangeFilter(counterRange, onCounterHit, DEF_COUNTER_MIN_VAL, DEF_COUNTER_MAX_VAL));
                  }

                  if (byBlockFrame) {
                    satisfiesFilter.push(satisfiesRangeFilter(blockRange, onBlock, DEF_BLOCK_MIN_VAL, DEF_BLOCK_MAX_VAL));
                  }

                  if (byNormalProps) {
                    satisfiesFilter.push(satisfiesPropertyFilter<HitProperty>(normalProps, move.hit.onHit));
                  }

                  if (byCounterProps) {
                    satisfiesFilter.push(satisfiesPropertyFilter<HitProperty>(counterProps, move.hit.onCounterHit));
                  }

                  if (byMoveProps) {
                    satisfiesFilter.push(satisfiesPropertyFilter<MoveProperty>(moveProps, move.properties));
                  }

                  // move must satisfy all active filters
                  return satisfiesFilter.length > 0 ? satisfiesFilter.every(sf => sf) : true;
                });

              })
            )
        )
      );
  }

  ngOnDestroy(): void {
    console.log('moveservice destroyed');
  }
}
