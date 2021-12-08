import {Injectable, OnDestroy} from '@angular/core';
import {FilterType, HitLevel, HitProperty, Move, MoveProperty, NumberRange} from '../types';
import {BehaviorSubject, combineLatest, Observable, of, Subject} from 'rxjs';
import {debounceTime, map, switchMap, filter} from 'rxjs/operators';
import {
  replaceAbbreviations,
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

  private _blockFilterType: BehaviorSubject<FilterType>;
  public blockFilterType$: Observable<FilterType>;
  private _blockFilter: BehaviorSubject<NumberRange>;
  public blockFilter$: Observable<NumberRange>;

  private _normalHitFilterType: BehaviorSubject<FilterType>;
  public normalHitFilterType$: Observable<FilterType>;
  private _normalHitFilter: BehaviorSubject<NumberRange>;
  public normalHitFilter$: Observable<NumberRange>;

  private _counterHitFilterType: BehaviorSubject<FilterType>;
  public counterHitFilterType$: Observable<FilterType>;
  private _counterHitFilter: BehaviorSubject<NumberRange>;
  public counterHitFilter$: Observable<NumberRange>;

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

  set blockFilterType(filterType: FilterType) {
    this._blockFilterType.next(filterType);
  }

  set blockFilter(range: NumberRange) {
    this._blockFilter.next(range);
  }

  set blockProps(properties: HitProperty[]) {
    this._blockProps.next(properties);
  }

  set normalHitFilter(range: NumberRange) {
    this._normalHitFilter.next(range);
  }

  set normalHitFilterType(type: FilterType) {
    this._normalHitFilterType.next(type);
  }

  set normalProps(properties: HitProperty[]) {
    this._normalProps.next(properties);
  }

  set counterHitFilter(range: NumberRange) {
    this._counterHitFilter.next(range);
  }

  set counterHitFilterType(type: FilterType) {
    this._counterHitFilterType.next(type);
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

    this._blockFilterType = new BehaviorSubject<FilterType>('contains');
    this.blockFilterType$ = this._blockFilterType.asObservable();
    this._blockFilter = new BehaviorSubject<NumberRange>({from: DEF_BLOCK_MIN_VAL, to: DEF_BLOCK_MAX_VAL} as NumberRange);
    this.blockFilter$ = this._blockFilter.asObservable();

    this._normalHitFilterType = new BehaviorSubject<FilterType>('contains');
    this.normalHitFilterType$ = this._normalHitFilterType.asObservable();
    this._normalHitFilter = new BehaviorSubject<NumberRange>({from: DEF_NORMAL_MIN_VAL, to: DEF_NORMAL_MAX_VAL} as NumberRange);
    this.normalHitFilter$ = this._normalHitFilter.asObservable();

    this._counterHitFilterType = new BehaviorSubject<FilterType>('contains');
    this.counterHitFilterType$ = this._counterHitFilterType.asObservable();
    this._counterHitFilter = new BehaviorSubject<NumberRange>({from: DEF_COUNTER_MIN_VAL, to: DEF_COUNTER_MAX_VAL} as NumberRange);
    this.counterHitFilter$ = this._counterHitFilter.asObservable();

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
        this.normalHitFilter$,
        this.counterHitFilter$,
      ]),
      combineLatest([
        this.blockFilterType$,
        this.normalHitFilterType$,
        this.counterHitFilterType$,
        this.hitLevelsFilterType$,
      ]),
      combineLatest([
        this.blockProps$,
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
                       blockFilterType,
                       normalHitFilterType,
                       counterHitFilterType,
                       hitLevelsFilterType,
                     ],
                     [
                       blockProps,
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
              map((data) => {
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

                // const searchedMoveIds = searchIndex.search(searchText, {expand: true}).map(item => item.ref);
                // console.log('searching for', searchText);

                // filter moves
                return data.filter(move => {
                  const satisfiesFilter: boolean[] = [];
                  const {_id, notation} = move;
                  const {startUp, onHit, onCounterHit, onBlock} = move.frameData;

                  if (withText) {
                    // notation search - strip both texts of [whitespace, /, + and ,] then look for the parts in the notation text
                    const reg = /[\s\/+,]/g;
                    const strippedNotation = notation.replace(reg, '').toLowerCase();
                    const strippedSearchText = searchText.replace(reg, '').toLowerCase();
                    // replace ss,ws,wr,<stance name> to full name
                    const replacedSearchText = replaceAbbreviations(strippedSearchText);
                    const isPartOfNotation = strippedNotation.includes(replacedSearchText);
                    // console.log('searching for', replacedSearchText, 'in move:', strippedNotation);

                    // hit level search - for example searching for LH should find moves that have "L","H" level
                    const joinedHitLevels = move.hit.move.join('').toLowerCase();
                    const includesHitLevel = joinedHitLevels.includes(strippedSearchText.toLowerCase());

                    // combine it with elastic
                    satisfiesFilter.push(/*searchedMoveIds.includes(_id) ||*/ isPartOfNotation || includesHitLevel);
                  }

                  if (byStartupFrame) {
                    satisfiesFilter.push(satisfiesRangeFilter(startUpRange, [startUp.frames], DEF_STARTUP_MIN_VAL, DEF_STARTUP_MAX_VAL));
                  }

                  if (byNormalFrame) {
                    satisfiesFilter.push(satisfiesRangeFilter(normalRange, onHit.frames, DEF_NORMAL_MIN_VAL, DEF_NORMAL_MAX_VAL, normalHitFilterType));
                  }

                  if (byCounterFrame) {
                    satisfiesFilter.push(satisfiesRangeFilter(counterRange, onCounterHit.frames, DEF_COUNTER_MIN_VAL, DEF_COUNTER_MAX_VAL, counterHitFilterType));
                  }

                  if (byBlockFrame) {
                    satisfiesFilter.push(satisfiesRangeFilter(blockRange, onBlock.frames, DEF_BLOCK_MIN_VAL, DEF_BLOCK_MAX_VAL, blockFilterType));
                  }

                  if (byBlockProps) {
                    satisfiesFilter.push(satisfiesPropertyFilter<HitProperty>(blockProps, onBlock.property, blockFilterType));
                  }

                  if (byNormalProps) {
                    satisfiesFilter.push(satisfiesPropertyFilter<HitProperty>(normalProps, onHit.property, normalHitFilterType));
                  }

                  if (byCounterProps) {
                    satisfiesFilter.push(satisfiesPropertyFilter<HitProperty>(counterProps, onCounterHit.property, counterHitFilterType));
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
