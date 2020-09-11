import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Move, NumberRange} from '../types';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {filterByRange} from '../utils/query-filters';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  private _startUpFilter: BehaviorSubject<NumberRange | null>;
  private _blockFilter: BehaviorSubject<NumberRange | null>;

  set startUpFilter(range: NumberRange) {
    this._startUpFilter.next(range);
  }

  set blockFilter(range: NumberRange) {
    this._blockFilter.next(range);
  }

  constructor(private firestore: AngularFirestore) {
    this._startUpFilter = new BehaviorSubject(null);
    this._blockFilter = new BehaviorSubject<NumberRange>(null);
  }

  public getMovelist$(characterId: string): Observable<Move[]> {
    return combineLatest([
      this._startUpFilter,
      this._blockFilter
    ]).pipe(
      switchMap(([startUpRange, blockRange]) =>
        this.firestore.collection<Move>(`characters/${characterId}/movelist`)
          .valueChanges({idField: '_id'}).pipe(
          map(moves => {
            // in memory filtering because firebase sucks monkey balls
            if (startUpRange) {
              moves = filterByRange<Move>(moves, 'frames.startUp', startUpRange);
            }

            if (blockRange) {
              moves = filterByRange<Move>(moves, 'frames.onBlock', blockRange);
            }
            return moves;
          })
        )
      )
    );
  }
}
