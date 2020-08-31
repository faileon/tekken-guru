import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Character, Move} from '../types';
import {filter} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoveService {


  constructor(private firestore: AngularFirestore) {
  }

  public getMovelist$(characterId: string): Observable<Move[]> {
    return this.firestore.collection<Move>(`characters/${characterId}/movelist`)
      .valueChanges({idField: '_id'});
  }
}
