import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Character} from '../types';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  public readonly characters$: Observable<Character[]>;

  constructor(private firestore: AngularFirestore) {
    this.characters$ = this.firestore
      .collection<Character>('characters', ref => ref.orderBy('position'))
      .valueChanges({idField: '_id'});
  }
}
