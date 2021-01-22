import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {Character, Move} from '../types';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import * as elasticlunr from 'elasticlunr';
import {Index} from 'elasticlunr';

@Injectable({
  providedIn: 'root'
})
export class CharacterService implements OnDestroy {
  private isDestroyed$: Subject<boolean> = new Subject<boolean>();

  private _searchText: BehaviorSubject<string>;
  public searchText$: Observable<string>;

  private readonly _characters: BehaviorSubject<Data<Character>>;
  private readonly characters$: Observable<Data<Character>>;

  private readonly _moves: BehaviorSubject<DataMap<Move>>;
  public readonly moves$: Observable<DataMap<Move>>;

  get moves(): DataMap<Move> {
    return this._moves.getValue();
  }

  set searchText(text: string) {
    this._searchText.next(text);
  }

  constructor(private firestore: AngularFirestore) {
    console.log('character service create');
    this._searchText = new BehaviorSubject('');
    this.searchText$ = this._searchText.asObservable();

    this._characters = new BehaviorSubject({data: [], searchIndex: null});
    this.characters$ = this._characters.asObservable();

    this._moves = new BehaviorSubject({});
    this.moves$ = this._moves.asObservable();

    /**
     * trying to reduce firestore calls, but still keep some freshness:
     *  - subscribe to firestore until app dies for live updates from serve to users.
     *  -  send back cached characters during single app lifespan
     */
    this.firestore
      .collection<Character>('characters', ref =>
        ref.orderBy('position')
      )
      .valueChanges({idField: '_id'})
      .pipe(
        takeUntil(this.isDestroyed$) // if in root then as long as app is running.
      )
      .subscribe(characters => {
        console.log('Got characters from server, updating runtime cache.');

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
    if (!this.moves[characterId]) {
      // todo this would be a good place to introduce loading screen - on fetch from server, for local data loading screen is pointless
      console.log(`didnt find moves for ${characterId}, fetching it from server and will keep listening for updates`);
      this.firestore.collection<Move>(`characters/${characterId}/movelist`)
        .valueChanges({idField: '_id'})
        .pipe(
          takeUntil(this.isDestroyed$)
        )
        .subscribe(moves => {
            console.log(`Fetched ${moves.length} moves from firestore for ${characterId}`);

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

    console.log(`Returning [${this.moves[characterId]?.data.length ?? '?'}] moves from cache for`, characterId);
    return this.moves$.pipe(
      map(moves => moves[characterId])
    );
  }
}

interface DataMap<T> {
  [_id: string]: Data<T>;
}

interface Data<T> {
  data: T[];
  searchIndex: Index<T>;
}
