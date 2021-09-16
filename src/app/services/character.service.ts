import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore, QueryFn} from '@angular/fire/firestore';
import {BehaviorSubject, combineLatest, Observable, of, Subject} from 'rxjs';
import {Character, Move, PersistenceTimestamps} from '../types';
import {distinct, distinctUntilChanged, map, skip, switchMap, takeUntil, tap} from 'rxjs/operators';
import * as elasticlunr from 'elasticlunr';
import {Index} from 'elasticlunr';
import {Combo} from '../types/combo.type';
import {getValueFromLocalStorage, isDateAfterInDays} from '../utils/common';

@Injectable({
  providedIn: 'root'
})
export class CharacterService implements OnDestroy { // consider renaming this to DATA SERVICE
  private isDestroyed$: Subject<boolean> = new Subject<boolean>();

  private _searchText: BehaviorSubject<string>;
  public searchText$: Observable<string>;

  private readonly _characters: BehaviorSubject<Data<Character>>;
  private readonly characters$: Observable<Data<Character>>;

  private readonly _moves: BehaviorSubject<DataMap<Move>>;
  public readonly moves$: Observable<DataMap<Move>>;

  private readonly _combos: BehaviorSubject<DataMap<Combo>>;
  public readonly combos$: Observable<DataMap<Combo>>;

  get moves(): DataMap<Move> {
    return this._moves.getValue();
  }

  get combos(): DataMap<Combo> {
    return this._combos.getValue();
  }

  set searchText(text: string) {
    this._searchText.next(text);
  }

  constructor(private firestore: AngularFirestore) {
    console.log('character service create');
    this._searchText = new BehaviorSubject('');
    this.searchText$ = this._searchText.asObservable();

    this._characters = new BehaviorSubject({data: []});
    this.characters$ = this._characters.asObservable();

    this._moves = new BehaviorSubject({});
    this.moves$ = this._moves.asObservable();

    this._combos = new BehaviorSubject({});
    this.combos$ = this._combos.asObservable();


    this.fetchData<Character>('characters', ref => ref.orderBy('position'))
      .pipe(
        takeUntil(this.isDestroyed$)
      )
      .subscribe(characters => {
        console.log('Got characters from server, updating runtime cache.', characters.length);

        const searchIndex = elasticlunr((idx: Index<Character>) => {
          idx.addField('_id');
          idx.addField('fullName');

          idx.setRef('_id');
        });

        for (const character of characters) {
          searchIndex.addDoc(character);
        }

        this._characters.next({
          data: characters,
          searchIndex
        });
      });

    // clear elastic stop words - todo call this elsewhere?
    elasticlunr.clearStopWords();
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }

  public getCharacters(): Observable<Character[]> {
    // combine latest in case of more filters
    return combineLatest([
      this.searchText$
    ]).pipe(
      switchMap(([text]) => {

        // nothing to search
        if (text.length === 0) {
          return this.characters$.pipe(
            map(({data}) => data)
          );
        }

        // search for character
        return this.characters$.pipe(
          map(({data, searchIndex}) => {
            const result = searchIndex.search(text, {expand: true});
            return data.filter(character => result.some(r => r.ref === character._id));
          })
        );
      })
    );
  }

  public getCharacter(_id: string): Observable<Character> {
    return this.characters$.pipe(
      map(characters => characters.data.find(char => char._id === _id)));
  }

  public getMoves(characterId: string): Observable<Data<Move>> {
    // this is now rather obsolete as we lost the Realtime update, but its better than paying 3k CZK per month...
    if (!this.moves[characterId]) {
      // console.log(`didnt find moves for ${characterId}, fetching it from server and will keep listening for updates`);
      this.fetchData<Move>(`characters/${characterId}/movelist`)
        .pipe(
          takeUntil(this.isDestroyed$)
        )
        .subscribe(moves => {
            // console.log(`Fetched ${moves.length} moves for ${characterId}`);

            // create search indexes on fields
            const searchIndex = elasticlunr((idx: Index<Move>) => {
              idx.addField('name');
              idx.addField('hit');
              idx.addField('properties');
              idx.addField('notation');
              idx.addField('tags');

              idx.setRef('_id');
            });

            // add all moves
            for (const move of moves) {
              searchIndex.addDoc(move);
            }

            // notify our subject
            this._moves.next({
              ...this._moves.getValue(),
              [characterId]: {
                data: moves,
                searchIndex
              }
            });
          }
        );
    }

    console.log(`Returning [${this.moves[characterId]?.data.length ?? '?'}] moves for`, characterId);
    return this.moves$.pipe(
      map(moves => moves[characterId])
    );
  }

  public getCombos(characterId: string): Observable<Data<Combo>> {
    if (!this.combos[characterId]) {
      // combos for character not in runtime cachem hookup to firestore live updates
      this.fetchData<Combo>(`characters/${characterId}/combos`)
        .subscribe(combos => {
          console.log(`Fetched ${combos.length} moves for ${characterId}`);
          console.log(combos);

          // emit to our combos data map observable
          this._combos.next({
            ...this._combos.getValue(),
            [characterId]: {
              data: combos
            }
          });
        });
    }

    console.log(`Returning [${this.combos[characterId]?.data.length ?? '?'}] combos for`, characterId);
    return this.combos$.pipe(
      map(combos => combos[characterId])
    );
  }

  private fetchDataFromSource<T>(path: string, source: 'default' | 'server' | 'cache', queryFn?: QueryFn): Observable<T[]> {
    return this.firestore.collection<T>(path, queryFn)
      .get({source})
      .pipe(
        map(res => res.docs.map(doc => ({
          ...doc.data(),
          _id: doc.id
        } as T))),
      );
  }

  private fetchData<T>(path: string, queryFn?: QueryFn): Observable<T[]> {
    return this.fetchDataFromSource<T>(path, 'cache', queryFn).pipe(
      switchMap(data => {
        // get timestamps dictionary from local storage and get last updated at for given path
        const timestamps = getValueFromLocalStorage<PersistenceTimestamps>('TG-lastUpdatedAt') ?? {};
        const dayInterval = parseInt(localStorage.getItem('TG-dataFreshnessInterval') ?? '1', 10) ?? 1;
        const parsedPath = path.replace(new RegExp(/\//, 'g'), ''); // replace the slashes because production build has problems with object keys containing slashes
        const lastUpdatedAt = timestamps[parsedPath] ?? 0;
        const now = Date.now();

        // if data from cache is empty or if the last updated timestamp is expired
        if (data.length === 0 || isDateAfterInDays(now, lastUpdatedAt, dayInterval)) {
          // fetch data from the server, which updates the cache
          console.log(`Returning "${path}" from server. Last updated at ${lastUpdatedAt}. Days interval ${dayInterval}`);
          return this.fetchDataFromSource<T>(path, 'server', queryFn)
            .pipe(
              tap(() => {
                // update the timestamp for this path
                timestamps[parsedPath] = Date.now();
                localStorage.setItem('TG-lastUpdatedAt', JSON.stringify(timestamps));
              })
            );
        } else {
          // from cache
          console.log(`Returning "${path}" from cache. Last updated at ${lastUpdatedAt}`);
          return of(data);
        }
      })
    );
  }

}

interface DataMap<T> {
  [_id: string]: Data<T>;
}

interface Data<T> {
  data: T[];
  searchIndex?: Index<T>;
}
