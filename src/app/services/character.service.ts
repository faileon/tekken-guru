import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subject,
  from,
} from 'rxjs';
import {
  Character,
  FirestoreInstance,
  Move,
  PersistenceTimestamps,
} from '../types';
import {
  delay,
  distinct,
  distinctUntilChanged,
  exhaustMap,
  filter,
  map,
  mergeMap,
  skip,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Combo } from '../types/combo.type';
import { getValueFromLocalStorage, isDateAfterInDays } from '../utils/common';
import { SettingsService } from './settings.service';
import { GameService } from './game.service';
// import {AngularFirestore, QueryFn} from '@angular/fire/compat/firestore';
import {
  Firestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getFirestore,
  FirestoreInstances,
  getDocsFromCache,
  getDocsFromServer,
} from '@angular/fire/firestore';
import {
  QueryCompositeFilterConstraint,
  QueryConstraint,
} from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CharacterService implements OnDestroy {
  // consider renaming this to DATA SERVICE
  private isDestroyed$: Subject<boolean> = new Subject<boolean>();

  private _searchText: BehaviorSubject<string>;
  public searchText$: Observable<string>;

  private readonly _characters: BehaviorSubject<Character[]>;
  private readonly characters$: Observable<Character[]>;

  private readonly _moves: BehaviorSubject<DataMap<Move>>;
  public readonly moves$: Observable<DataMap<Move>>;

  private readonly _combos: BehaviorSubject<DataMap<Combo>>;
  public readonly combos$: Observable<DataMap<Combo>>;

  public readonly currentDatabase$: Observable<Firestore>;

  get moves(): DataMap<Move> {
    return this._moves.getValue();
  }

  get combos(): DataMap<Combo> {
    return this._combos.getValue();
  }

  set searchText(text: string) {
    this._searchText.next(text);
  }

  get searchText(): string {
    return this._searchText.getValue();
  }

  constructor(
    private gameService: GameService,
    private settingsService: SettingsService,
    private firestores: FirestoreInstances,
  ) {
    console.log('character service create');

    this.currentDatabase$ = this.gameService.selectedGame$.pipe(
      filter((selectedGame) => !!selectedGame),
      map((selectedGame) => {
        return this.firestores.find((store) => {
          const firestore = store.toJSON() as FirestoreInstance;
          return firestore.databaseId.database === selectedGame.value;
        });
      }),
      map((firestore) => firestore ?? this.firestores[0]),
    );

    this._searchText = new BehaviorSubject('');
    this.searchText$ = this._searchText.asObservable();

    this._characters = new BehaviorSubject([]);
    this.characters$ = this._characters.asObservable();

    this._moves = new BehaviorSubject({});
    this.moves$ = this._moves.asObservable();

    this._combos = new BehaviorSubject({});
    this.combos$ = this._combos.asObservable();

    const { defaultCharacterSort$ } = this.settingsService;

    combineLatest([defaultCharacterSort$, this.currentDatabase$])
      .pipe(
        map(([sort, firestore]) => ({
          sort: sort.split(' ')[0] ?? 'position',
          firestore,
        })), // default position
        map(({ sort, firestore }) => ({
          sort: sort !== 'position' ? undefined : sort,
          firestore,
        })), // if not position, remove sort all together - default is by ID, and IDs are names of characters
        switchMap(({ sort, firestore }) =>
          this.fetchData<Character>(
            firestore,
            'characters',
            sort ? orderBy(sort) : undefined,
          ),
        ),
        takeUntil(this.isDestroyed$),
      )
      .subscribe((characters) => {
        console.log(
          'Got characters from server, updating runtime cache.',
          characters.length,
        );
        this._characters.next(characters);
      });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }

  public getCharacters(): Observable<Character[]> {
    // combine latest in case of more filters
    return combineLatest([this.searchText$]).pipe(
      switchMap(([text]) => {
        // nothing to search
        if (text.length === 0) {
          return this.characters$;
        }

        return this.characters$.pipe(
          map((characters) =>
            characters.filter((char) => {
              const searchText = text.toLowerCase();
              const { _id, fullName } = char;
              return (
                _id.includes(searchText) ||
                fullName.toLowerCase().includes(searchText)
              );
            }),
          ),
        );
      }),
    );
  }

  public getCharacter(_id: string): Observable<Character> {
    return this.characters$.pipe(
      map((characters) => characters.find((char) => char._id === _id)),
    );
  }

  public getMoves(characterId: string): Observable<Move[]> {
    // this is now rather obsolete as we lost the Realtime update, but its better than paying 3k CZK per month...
    if (!this.moves[characterId]) {
      // console.log(`didnt find moves for ${characterId}, fetching it from server and will keep listening for updates`);
      this.currentDatabase$
        .pipe(
          switchMap((firestore) =>
            this.fetchData<Move>(
              firestore,
              `characters/${characterId}/movelist`,
            ),
          ),
          takeUntil(this.isDestroyed$),
        )
        .subscribe((moves) => {
          // console.log(`Fetched ${moves.length} moves for ${characterId}`);
          // notify our subject
          this._moves.next({
            ...this._moves.getValue(),
            [characterId]: moves,
          });
        });
    }

    console.log(
      `Returning [${this.moves[characterId]?.length ?? '?'}] moves for`,
      characterId,
    );
    return this.moves$.pipe(map((moves) => moves[characterId]));
  }

  public getCombos(characterId: string): Observable<Combo[]> {
    if (!this.combos[characterId]) {
      // combos for character not in runtime cachem hookup to firestore live updates
      this.currentDatabase$
        .pipe(
          switchMap((firestore) =>
            this.fetchData<Combo>(
              firestore,
              `characters/${characterId}/combos`,
            ),
          ),
        )
        .subscribe((combos) => {
          console.log(`Fetched ${combos.length} moves for ${characterId}`);

          // emit to our combos data map observable
          this._combos.next({
            ...this._combos.getValue(),
            [characterId]: combos,
          });
        });
    }

    console.log(
      `Returning [${this.combos[characterId]?.length ?? '?'}] combos for`,
      characterId,
    );
    return this.combos$.pipe(map((combos) => combos[characterId]));
  }

  private fetchDataFromSource<T>(
    firestore: Firestore,
    path: string,
    source: 'default' | 'server' | 'cache',
    queryFn?: QueryConstraint,
  ): Observable<T[]> {
    const theQuery = query(collection(firestore, path), queryFn);
    const docGetter = {
      server: getDocsFromServer(theQuery),
      cache: getDocsFromCache(theQuery),
      default: getDocs(theQuery),
    }[source];

    return from(docGetter).pipe(
      map(({ docs }) => {
        return docs.map(
          (doc) =>
            ({
              ...doc.data(),
              _id: doc.id,
            }) as T,
        );
      }),
    );
  }

  private fetchData<T>(
    firestore: Firestore,
    path: string,
    queryFn?: QueryConstraint,
  ): Observable<T[]> {
    return this.fetchDataFromSource<T>(firestore, path, 'cache', queryFn).pipe(
      switchMap((data) => {
        // get timestamps dictionary from local storage and get last updated at for given path
        const timestamps =
          getValueFromLocalStorage<PersistenceTimestamps>('TG-lastUpdatedAt') ??
          {};
        const dayInterval =
          parseInt(
            localStorage.getItem('TG-dataFreshnessInterval') ?? '1',
            10,
          ) ?? 1;
        const parsedPath = path.replace(new RegExp(/\//, 'g'), ''); // replace the slashes because production build has problems with object keys containing slashes
        const lastUpdatedAt = timestamps[parsedPath] ?? 0;
        const now = Date.now();

        // if data from cache is empty or if the last updated timestamp is expired
        if (
          data.length === 0 ||
          isDateAfterInDays(now, lastUpdatedAt, dayInterval)
        ) {
          // fetch data from the server, which updates the cache
          console.log(
            `Returning "${path}" from server. Last updated at ${lastUpdatedAt}. Days interval ${dayInterval}`,
          );
          return this.fetchDataFromSource<T>(
            firestore,
            path,
            'server',
            queryFn,
          ).pipe(
            tap(() => {
              // update the timestamp for this path
              timestamps[parsedPath] = Date.now();
              localStorage.setItem(
                'TG-lastUpdatedAt',
                JSON.stringify(timestamps),
              );
            }),
          );
        } else {
          // from cache
          console.log(
            `Returning "${path}" from cache. Last updated at ${lastUpdatedAt}`,
          );
          return of(data);
        }
      }),
    );
  }
}

interface DataMap<T> {
  [_id: string]: T[];
}

/*interface Data<T> {
  data: T[];
  searchIndex?: Index<T>;
}*/
