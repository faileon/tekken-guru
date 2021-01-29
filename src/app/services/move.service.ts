import {Injectable, OnDestroy} from '@angular/core';
import {FilterType, HitLevel, HitProperty, Move, MoveProperty, NumberRange} from '../types';
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
  private _blockProps: BehaviorSubject<HitProperty[]>; // only crouch here
  public blockProps$: Observable<HitProperty[]>;

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
  private _hitLevelsFilterType: BehaviorSubject<FilterType>;
  public hitLevelsFilterType$: Observable<FilterType>;

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

  set blockProps(properties: HitProperty[]) {
    this._blockProps.next(properties);
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

  set hitLevelsFilterType(filterType: FilterType) {
    this._hitLevelsFilterType.next(filterType);
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

    this._blockProps = new BehaviorSubject<HitProperty[]>([]);
    this.blockProps$ = this._blockProps.asObservable();

    this._normalProps = new BehaviorSubject<HitProperty[]>([]);
    this.normalProps$ = this._normalProps.asObservable();

    this._counterProps = new BehaviorSubject<HitProperty[]>([]);
    this.counterProps$ = this._counterProps.asObservable();

    this._moveProps = new BehaviorSubject<MoveProperty[]>([]);
    this.moveProps$ = this._moveProps.asObservable();

    this._hitLevelsFilterType = new BehaviorSubject<FilterType>('contains');
    this.hitLevelsFilterType$ = this._hitLevelsFilterType.asObservable();
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
        this.blockProps$,
        this.normalProps$,
        this.counterProps$,
        this.moveProps$,
        this.hitLevelsFilterType$,
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
                       blockProps,
                       normalProps,
                       counterProps,
                       moveProps,
                       hitLevelsFilterType,
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
                const byBlockProps = shouldFilterByProperties(blockProps);
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
                  byBlockProps,
                  byNormalProps,
                  byCounterProps,
                  byMoveProps,
                  byHitLevels,
                ].filter(f => f).length;

                // no filters used and not looking for text, just return everything
                if (this.activeFiltersCount === 0 && !withText) {
                  return data;
                }

                const searchedMoveIds = searchIndex.search(searchText, {expand: true}).map(item => item.ref);
                // console.log('searching for', searchText);

                // filter moves
                return data.filter(move => {
                  const satisfiesFilter: boolean[] = [];
                  const {_id, notation} = move;
                  const {startUp, onHit, onCounterHit, onBlock} = move.frameData;

                  if (withText) {
                    // notation search - strip both texts of [whitespace, /, + and ,] then look for the parts in the notation text
                    const reg = /[\s\/+,]/g;
                    const strippedNotation = notation.replace(reg, '');
                    const strippedSearchText = searchText.replace(reg, '');
                    const isPartOfNotation = strippedNotation.includes(strippedSearchText);

                    // hit level search - for example searching for LH should find moves that have "L","H" level
                    const joinedHitLevels = move.hit.move.join('').toLowerCase();
                    const includesHitLevel = joinedHitLevels.includes(strippedSearchText.toLowerCase());

                    // combine it with elastic
                    satisfiesFilter.push(searchedMoveIds.includes(_id) || isPartOfNotation || includesHitLevel);
                  }

                  if (byStartupFrame) {
                    satisfiesFilter.push(satisfiesRangeFilter(startUpRange, [startUp.frames], DEF_STARTUP_MIN_VAL, DEF_STARTUP_MAX_VAL));
                  }

                  if (byNormalFrame) {
                    satisfiesFilter.push(satisfiesRangeFilter(normalRange, onHit.frames, DEF_NORMAL_MIN_VAL, DEF_NORMAL_MAX_VAL));
                  }

                  if (byCounterFrame) {
                    satisfiesFilter.push(satisfiesRangeFilter(counterRange, onCounterHit.frames, DEF_COUNTER_MIN_VAL, DEF_COUNTER_MAX_VAL));
                  }

                  if (byBlockFrame) {
                    satisfiesFilter.push(satisfiesRangeFilter(blockRange, onBlock.frames, DEF_BLOCK_MIN_VAL, DEF_BLOCK_MAX_VAL));
                  }

                  if (byBlockProps) {
                    satisfiesFilter.push(satisfiesPropertyFilter<HitProperty>(blockProps, onBlock.property));
                  }

                  if (byNormalProps) {
                    satisfiesFilter.push(satisfiesPropertyFilter<HitProperty>(normalProps, onHit.property));
                  }

                  if (byCounterProps) {
                    satisfiesFilter.push(satisfiesPropertyFilter<HitProperty>(counterProps, onCounterHit.property));
                  }

                  if (byMoveProps) {
                    satisfiesFilter.push(satisfiesPropertyFilter<MoveProperty>(moveProps, move.properties));
                  }

                  if (byHitLevels) {
                    satisfiesFilter.push(satisfiesPropertyFilter<HitLevel>(hitLevels, move.hit.move, hitLevelsFilterType));
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
