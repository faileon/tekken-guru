import {Injectable, OnDestroy} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Character, Move} from '../types';
import {map, takeUntil} from 'rxjs/operators';

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

  public getMoves(characterId: string): Observable<Move[]> {
    if (!this.moves[characterId]) {
      console.log('didnt find moves for', characterId, 'fetching it from firestore');
      this.firestore.collection<Move>(`characters/${characterId}/movelist`)
        .valueChanges({idField: '_id'})
        .pipe(
          takeUntil(this.isDestroyed$)
        )
        .subscribe(moves => {
          console.log('updating moves for', characterId);
          this._moves.next({
            ...this._moves.getValue(),
            [characterId]: moves
          });
        });
    }

    console.log('returning moves for', characterId);
    return this.moves$.pipe(
      map(moves => moves[characterId])
    );
  }

}

interface MoveMap {
  [charId: string]: Move[];
}
