import {Component, OnDestroy, OnInit, Optional, SkipSelf} from '@angular/core';
import {CharacterService} from '../../../../../services/character.service';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {MoveService} from '../../../../../services/move.service';
import {HitProperty, Move, NumberRange} from '../../../../../types';
import {DEF_BLOCK_MAX_VAL, DEF_BLOCK_MIN_VAL, DEF_STARTUP_MAX_VAL, DEF_STARTUP_MIN_VAL} from '../../../../../config/default-frames.config';

@Component({
  selector: 'tg-movelist-screen',
  templateUrl: './character-movelist-screen.component.html',
  styleUrls: ['./character-movelist-screen.component.scss'],

})
export class CharacterMovelistScreenComponent implements OnInit, OnDestroy {
  private isDestroyed$ = new Subject<boolean>();
  public movelist$?: Observable<Move[]>;

  constructor(private characterService: CharacterService, @SkipSelf() public moveService: MoveService) {
  }

  ngOnInit(): void {

    this.characterService.selectedCharacter$?.pipe(
      takeUntil(this.isDestroyed$),
    ).subscribe(selectedCharacter => {
      if (selectedCharacter) {
        this.movelist$ = this.moveService.getMovelist$(selectedCharacter._id);
      }
    });


    this.moveService.normalProps$.subscribe(props => console.log('props', props));
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }


  public filterByStartUpFrame(range: NumberRange): void {
    this.moveService.startUpFilter = range;
  }

  public filterByBlockFrame(range: NumberRange): void {
    this.moveService.blockFilter = range;
  }

  public filterByNormalFrame(range: NumberRange): void {
    this.moveService.normalFilter = range;
  }

  public setNormalHitProperties(properties: HitProperty[]): void {
    this.moveService.normalProps = properties;
  }

  public resetFilters(): void {
    this.moveService.startUpFilter = {from: DEF_STARTUP_MIN_VAL, to: DEF_STARTUP_MAX_VAL};
    this.moveService.blockFilter = {from: DEF_BLOCK_MIN_VAL, to: DEF_BLOCK_MAX_VAL};
  }

  public onTextSearch(text: string): void {
    console.log('searching for', text);
  }
}
