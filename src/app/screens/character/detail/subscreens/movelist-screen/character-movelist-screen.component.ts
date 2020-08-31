import {Component, OnDestroy, OnInit} from '@angular/core';
import {TabService} from '../../../../../services/tab.service';
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

  constructor(private tabService: TabService, private characterService: CharacterService, private moveService: MoveService) {
  }

  ngOnInit(): void {
    this.tabService.setActiveTab('movelist');

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


}
