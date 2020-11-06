import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Character, Move} from '../types';
import {map, takeUntil} from 'rxjs/operators';
import * as elasticlunr from 'elasticlunr';
import {Index} from 'elasticlunr';

@Injectable({
  providedIn: 'root'
})
export class CharacterService implements OnDestroy {
  private isDestroyed$: Subject<boolean> = new Subject<boolean>();

  private readonly _characters: BehaviorSubject<Character[]>;
  public readonly characters$: Observable<Character[]>;

  private readonly _moves: BehaviorSubject<MoveMap>;
  public readonly moves$: Observable<MoveMap>;

  get moves(): MoveMap {
    return this._moves.getValue();
  }

  constructor(private firestore: AngularFirestore) {
    console.log('character service create');
    this._characters = new BehaviorSubject<Character[]>([]);
    this.characters$ = this._characters.asObservable();

    this._moves = new BehaviorSubject<MoveMap>({});
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
        console.log('setting character from fs');
        this._characters.next(characters);
      });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }

  public getCharacter(_id: string): Observable<Character> {
    return this.characters$.pipe(
      map(characters => characters.find(char => char._id === _id))
    );
  }

  public getMoves(characterId: string): Observable<MoveData> {
    if (!this.moves[characterId]) {
      // todo this would be a good place to introduce loading screen - on fetch from server, for local data loading screen is pointless
      console.log(`didnt find moves for ${characterId}, fetching it from server and will keep listening for updates`);
      this.firestore.collection<Move>(`characters/${characterId}/movelist`)
        .valueChanges({idField: '_id'})
        .pipe(
          takeUntil(this.isDestroyed$)
        )
        .subscribe(moves => {
            console.log(`got ${moves.length} moves from the server for ${characterId}`);

            // create search indexes on fields
            const searchIndex = elasticlunr((idx: Index<Move>) => {
              idx.addField('name');
              idx.addField('hit');
              idx.addField('properties');
              idx.addField('notation');
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
                moves,
                searchIndex
              }
            });
          }
        );
    }

    console.log('returning moves (cached) move data for', characterId);
    return this.moves$.pipe(
      map(moves => moves[characterId])
    );
  }

}

interface MoveMap {
  [charId: string]: MoveData;
}

interface MoveData {
  moves: Move[];
  searchIndex: Index<Move>;
}
