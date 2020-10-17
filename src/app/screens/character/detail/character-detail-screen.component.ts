import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Character, CharacterParams} from '../../../types';
import {CharacterService} from '../../../services/character.service';
import {TGMenuItem} from '../../../types/ui.types';
import {MoveService} from '../../../services/move.service';
import {Observable} from 'rxjs';
import {DEFAULT_CHARACTER_TABS} from '../../../config/navigation.config';

@Component({
  selector: 'tg-character-detail-screen-component',
  templateUrl: './character-detail-screen.component.html',
  styleUrls: ['./character-detail-screen.component.scss'],
  providers: [MoveService]
})
export class CharacterDetailScreenComponent implements OnInit, OnDestroy {
  // private isDestroyed$: Subject<boolean> = new Subject<boolean>();
  public tabs: TGMenuItem[] = DEFAULT_CHARACTER_TABS;
  public selectedCharacter$!: Observable<Character>;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService) {

    // subscribe to route params
    const {_id} = this.route.snapshot.params as CharacterParams;
    this.selectedCharacter$ = this.characterService.getCharacter(_id);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('destroyed char detail');
    // this.isDestroyed$.next(true);
    // this.isDestroyed$.unsubscribe();
  }

}
