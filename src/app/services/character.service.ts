import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Character} from '../types';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {

    public readonly characters$: Observable<Character[]>;
    public selectedCharacter$?: Observable<Character | undefined>;

    constructor(private firestore: AngularFirestore) {
        this.characters$ = this.firestore
            .collection<Character>('characters', ref =>
                ref.orderBy('position')
            )
            .valueChanges({idField: '_id'});
    }

    public setSelectedCharacterById(_id: string): void {
        this.selectedCharacter$ = this.characters$.pipe(
            map(characters => characters.find(char => char._id === _id))
        );
    }
}
