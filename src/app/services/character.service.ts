import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Character} from '../types';
import {AngularFirestore} from '@angular/fire/firestore';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  public readonly characters$: Observable<Character[]>;

  constructor(private firestore: AngularFirestore) {
    this.characters$ = this.firestore
      .collection<Character>('characters', ref =>
        ref.orderBy('position')
      )
      .valueChanges({idField: '_id'});
  }

  // todo fix return type?
  public getSelectedCharacter$(_id: string): Observable<Character | undefined> {
    return this.firestore.collection<Character>(`characters`)
      .doc<Character>(_id)
      .valueChanges()
      .pipe(
        filter(character => character !== undefined)
      );
  }
}
