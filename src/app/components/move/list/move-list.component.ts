import {
  DEF_BLOCK_MAX_VAL,
  DEF_BLOCK_MIN_VAL,
  DEF_COUNTER_MAX_VAL,
  DEF_COUNTER_MIN_VAL,
  DEF_NORMAL_MAX_VAL,
  DEF_NORMAL_MIN_VAL,
  DEF_STARTUP_MAX_VAL,
  DEF_STARTUP_MIN_VAL,
} from '../../../config/default-frames.config';
import { MoveService } from '../../../services/move.service';
import { Subject } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import {
  FilterType,
  HitLevel,
  HitProperty,
  Move,
  MoveProperty,
  NumberRange,
} from '../../../types';
import { SearchBarComponent } from '../../ui/search-bar/search-bar.component';
import { SettingsService } from '../../../services/settings.service';
import { takeUntil } from 'rxjs/operators';
import { Game } from '../../../types/ui.types';

@Component({
  selector: 'tg-move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoveListComponent implements OnInit, OnDestroy {
  private isDestroyed$ = new Subject<boolean>();

  @ViewChild('searchBar', { static: true })
  private searchBar: SearchBarComponent;

  @Input()
  public movelist!: Move[];

  @Input()
  public selectedGame: Game;

  constructor(
    @SkipSelf() public moveService: MoveService,
    public settingsService: SettingsService,
  ) {}

  ngOnInit(): void {
    this.settingsService.contentOrder$
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe(({ notation, video, frameData }) => {
        document.documentElement.style.setProperty(
          '--notation-order',
          notation.toString(),
        );
        document.documentElement.style.setProperty(
          '--video-order',
          video.toString(),
        );
        document.documentElement.style.setProperty(
          '--frame-data-order',
          frameData.toString(),
        );
      });
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
    this.moveService.normalHitFilter = range;
  }

  public setNormalHitProperties(properties: HitProperty[]): void {
    this.moveService.normalProps = properties;
  }

  public setBlockHitProperties(properties: HitProperty[]): void {
    this.moveService.blockProps = properties;
  }

  public filterByCounterFrame(range: NumberRange): void {
    this.moveService.counterHitFilter = range;
  }

  public setCounterHitProperties(properties: HitProperty[]): void {
    this.moveService.counterProps = properties;
  }

  public setMoveProperties(properties: MoveProperty[]): void {
    this.moveService.moveProps = properties;
  }

  public setHitLevels(hitLevels: HitLevel[]): void {
    this.moveService.hitLevels = hitLevels;
  }

  public setHitLevelsFilterType(filterType: FilterType): void {
    this.moveService.hitLevelsFilterType = filterType;
  }

  public setBlockFilterType(filterType: FilterType): void {
    this.moveService.blockFilterType = filterType;
  }

  public setCounterHitFilterType(filterType: FilterType): void {
    this.moveService.counterHitFilterType = filterType;
  }

  public setNormalHitFilterType(filterType: FilterType): void {
    this.moveService.normalHitFilterType = filterType;
  }

  public resetFilters(): void {
    this.moveService.startUpFilter = {
      from: DEF_STARTUP_MIN_VAL,
      to: DEF_STARTUP_MAX_VAL,
    };
    this.moveService.blockFilter = {
      from: DEF_BLOCK_MIN_VAL,
      to: DEF_BLOCK_MAX_VAL,
    };
    this.moveService.normalHitFilter = {
      from: DEF_NORMAL_MIN_VAL,
      to: DEF_NORMAL_MAX_VAL,
    };
    this.moveService.counterHitFilter = {
      from: DEF_COUNTER_MIN_VAL,
      to: DEF_COUNTER_MAX_VAL,
    };
    this.moveService.blockProps = [];
    this.moveService.normalProps = [];
    this.moveService.counterProps = [];
    this.moveService.moveProps = [];
    this.moveService.hitLevels = [];
    this.searchBar.resetText();
  }

  public onTextSearch(text: string): void {
    this.moveService.searchText = text;
  }
}
