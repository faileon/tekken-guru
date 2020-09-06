import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterService} from '../../../../../services/character.service';
import {filter, take, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {MoveService} from '../../../../../services/move.service';
import {Move} from '../../../../../types';

@Component({
  selector: 'tg-movelist-screen',
  templateUrl: './character-movelist-screen.component.html',
  styleUrls: ['./character-movelist-screen.component.scss'],
})
export class CharacterMovelistScreenComponent implements OnInit, OnDestroy {
  private isDestroyed$ = new Subject<boolean>();
  public movelist$?: Observable<Move[]>;

  constructor(private characterService: CharacterService, private moveService: MoveService) {
  }

  ngOnInit(): void {

    this.characterService.selectedCharacter$?.pipe(
      takeUntil(this.isDestroyed$),
    ).subscribe(selectedCharacter => {
      if (selectedCharacter) {
        this.movelist$ = this.moveService.getMovelist$(selectedCharacter._id);
      }
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }


  public filterByStartUpFrame(): void {
    this.moveService.startUpFilter = {from: 10, to: 12};
  }

  public filterByBlockFrame(): void {
    this.moveService.blockFilter = {from: -9, to: 2};
  }

  public onTextSearch(text: string): void {
    console.log('searching for', text);
  }
}
