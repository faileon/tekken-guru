import {
  DEF_BLOCK_MAX_VAL, DEF_BLOCK_MIN_VAL,
  DEF_COUNTER_MAX_VAL, DEF_COUNTER_MIN_VAL,
  DEF_NORMAL_MAX_VAL,
  DEF_NORMAL_MIN_VAL,
  DEF_STARTUP_MAX_VAL, DEF_STARTUP_MIN_VAL
} from '../../../config/default-frames.config';
import {MoveService} from '../../../services/move.service';
import {Subject} from 'rxjs';
import {Component, Input, OnDestroy, OnInit, SkipSelf} from '@angular/core';
import {HitProperty, Move, MoveProperty, NumberRange} from '../../../types';

@Component({
  selector: 'tg-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss'],

})
export class MoveListComponent implements OnInit, OnDestroy {
  private isDestroyed$ = new Subject<boolean>();

  @Input()
  public movelist!: Move[];

  constructor(@SkipSelf() public moveService: MoveService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }

  public trackByMoveId(index: number, move: Move): string {
    return move._id;
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

  public filterByCounterFrame(range: NumberRange): void {
    this.moveService.counterFilter = range;
  }

  public setCounterHitProperties(properties: HitProperty[]): void {
    this.moveService.counterProps = properties;
  }

  public setMoveProperties(properties: MoveProperty[]): void {
    this.moveService.moveProps = properties;
  }

  public resetFilters(): void {
    this.moveService.startUpFilter = {from: DEF_STARTUP_MIN_VAL, to: DEF_STARTUP_MAX_VAL};
    this.moveService.blockFilter = {from: DEF_BLOCK_MIN_VAL, to: DEF_BLOCK_MAX_VAL};
    this.moveService.normalFilter = {from: DEF_NORMAL_MIN_VAL, to: DEF_NORMAL_MAX_VAL};
    this.moveService.counterFilter = {from: DEF_COUNTER_MIN_VAL, to: DEF_COUNTER_MAX_VAL};
    this.moveService.normalProps = [];
    this.moveService.counterProps = [];
    this.moveService.moveProps = [];
  }

  public onTextSearch(text: string): void {
    console.log('searching for', text);
  }
}
