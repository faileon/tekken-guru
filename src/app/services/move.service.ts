import {Injectable, OnDestroy} from '@angular/core';
import {HitLevel, HitProperty, Move, MoveProperty, NumberRange} from '../types';
import {BehaviorSubject, combineLatest, Observable, of, Subject} from 'rxjs';
import {debounceTime, map, switchMap, filter} from 'rxjs/operators';
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
import {CharacterService} from './character.service';

@Injectable()
export class MoveService implements OnDestroy {

  /********************
   * SEARCHING FILTERS:
   *********************/
  private _searchText: BehaviorSubject<string>;
  public searchText$: Observable<string>;

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
   * HIT LEVELS PROPERTIES:
   *********************/
  private _hitLevels: BehaviorSubject<HitLevel[]>;
  public hitLevels$: Observable<HitLevel[]>;

  /********************
   * ACTIVE FILTERS COUNT:
   *********************/
  private _activeFiltersCount: BehaviorSubject<number>;
  public activeFiltersCount$: Observable<number>;

  /********************
   * SUBJECT SETTERS:
   *********************/
  set searchText(text: string) {
    this._searchText.next(text);
  }

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

  set hitLevels(hitLevels: HitLevel[]) {
    this._hitLevels.next(hitLevels);
  }

  set activeFiltersCount(count: number) {
    this._activeFiltersCount.next(count);
  }

  get activeFiltersCount(): number {
    return this._activeFiltersCount.getValue();
  }

  constructor(private characterService: CharacterService) {
    console.log('moveservice created');

    this._searchText = new BehaviorSubject<string>('');
    this.searchText$ = this._searchText.asObservable();

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

    this._hitLevels = new BehaviorSubject<HitLevel[]>([]);
    this.hitLevels$ = this._hitLevels.asObservable();

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
        this.moveProps$,
        this.hitLevels$
      ]),
      combineLatest([
        this.searchText$
      ])
    ])
      .pipe(
        debounceTime(0), // when we trigger more than one filter (for example when reseting), the switch-map would not work without this
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
                       moveProps,
                       hitLevels
                     ],
                     [
                       searchText
                     ]
                   ]) =>
          this.characterService.getMoves(characterId)
            .pipe(
              filter((moves) => !!moves),
              map(({data, searchIndex}) => {
                // determine what will be filtered - see if there are filters set
                const byStartupFrame = shouldFilterStartupFrame(startUpRange);
                const byNormalFrame = shouldFilterNormalFrame(normalRange);
                const byCounterFrame = shouldFilterCounterFrame(counterRange);
                const byBlockFrame = shouldFilterBlockFrame(blockRange);
                const byNormalProps = shouldFilterByProperties(normalProps);
                const byCounterProps = shouldFilterByProperties(counterProps);
                const byMoveProps = shouldFilterByProperties(moveProps);
                const byHitLevels = shouldFilterByProperties(hitLevels);
                const withText = searchText?.length > 0;

                // calculate the number of active filters
                this.activeFiltersCount = [
                  byStartupFrame,
                  byNormalFrame,
                  byCounterFrame,
                  byBlockFrame,
                  byNormalProps,
                  byCounterProps,
                  byMoveProps,
                  byHitLevels,
                  withText
                ].filter(f => f).length;

                // no filter, just return everything
                if (this.activeFiltersCount === 0) {
                  return data;
                }

                const searchedMoveIds = searchIndex.search(searchText, {expand: true}).map(item => item.ref);
                console.log(`searching for "${searchText}" yielded the following results: ${searchedMoveIds}`);

                // filter moves
                return data.filter(move => {
                  const satisfiesFilter: boolean[] = [];
                  const {_id} = move;
                  const {startUp, onHit, onCounterHit, onBlock} = move.frames;

                  if (withText) {
                    // best of 2 worlds, elastic does not work very well with "/" and ",'
                    satisfiesFilter.push(searchedMoveIds.includes(_id));
                  }

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

                  if (byHitLevels) {
                    satisfiesFilter.push(satisfiesPropertyFilter(hitLevels, move.hit.move));
                  }

                  // move must satisfy all active filters - can switch OR | AND here by switching every() for some()
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
