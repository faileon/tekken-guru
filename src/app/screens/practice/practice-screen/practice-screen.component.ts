/* tslint:disable:no-inferrable-types */
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GamepadService} from '../../../services/gamepad.service';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {NumberRange} from '../../../types';
import {getRandomNumber, getToggledProperties} from '../../../utils/common';

@Component({
  selector: 'tg-practice-screen',
  templateUrl: './practice-screen.component.html',
  styleUrls: ['./practice-screen.component.scss'],
  providers: [
    GamepadService
  ]
})
export class PracticeScreenComponent implements AfterViewInit, OnDestroy {
  private isDestroyed$ = new Subject<boolean>();

  public gamepads$: Observable<Gamepad[]>;
  public selectedGamepad$: Observable<Gamepad>;
  public pressedButtons$: Observable<boolean[]>; // max-size:2, notation press: [one, two]

  @ViewChild('canvasElement')
  private canvasElement!: ElementRef<HTMLCanvasElement>;

  @ViewChild('videoElement')
  private videoElementRef!: ElementRef<HTMLVideoElement>;

  public neutralRange: NumberRange = {from: 3, to: 3}; // 1 - 5
  public decoyRange: NumberRange = {from: 0.2}; // 0 - 1
  public desiredThrows: ThrowType[] = ['throw-1', 'throw-2', 'throw-1+2'];

  // flag about pressing
  public guessedAlready = false;

  // track timeline and current item
  private timeline: TimelineItem[];
  public currentTimelineItem$: BehaviorSubject<TimelineItem>;


  // current score count
  public score = {
    breaks: {
      success: 0,
      fail: 0,
      miss: 0
    },
    decoys: {
      success: 0,
      fail: 0
    }
  };


  constructor(private gamepadService: GamepadService) {
    this.gamepads$ = this.gamepadService.gamepadList$.pipe(
      map(list => Object.values(list).filter(gamepad => !!gamepad))
    );

    this.selectedGamepad$ = this.gamepadService.selectedGamepad$;

    this.pressedButtons$ = this.gamepadService.pressedButtons$.pipe(
      map(buttons => {
        return buttons.reduce((acc, curr, index) => {
          // todo custom mapping
          if (index === 2 && curr.pressed) {
            acc[0] = true;
          }
          if (index === 3 && curr.pressed) {
            acc[1] = true;
          }
          if (index === 5 && curr.pressed) {
            acc[0] = true;
            acc[1] = true;
          }
          return acc;
        }, [false, false] as boolean[]);
      })
    );

    this.timeline = createTimeline(this.neutralRange, this.decoyRange.from, this.desiredThrows);
    this.currentTimelineItem$ = new BehaviorSubject<TimelineItem>(this.timeline.shift());

    // THROW BREAK INPUT QUEUE
    combineLatest([
      this.pressedButtons$,
      this.currentTimelineItem$
    ]).pipe(
      takeUntil(this.isDestroyed$),
      filter(([_, item]) => item.type === 'break'), // only break window
      filter(([buttons, _]) => buttons.some(b => b) && !this.guessedAlready) // pressed something and haven't guessed yet
    ).subscribe(([buttons, item]) => {
      // now you guessed
      this.guessedAlready = true;

      // did you guess right tho? compare buttons if they match
      if (compareBooleans(buttons, item.breakButtons)) {
        this.onThrowBreakSuccess(item);
      } else {
        this.onThrowBreakFail(item);
      }

    });

    // DECOY INPUT QUEUE
    combineLatest([
      this.pressedButtons$,
      this.currentTimelineItem$
    ]).pipe(
      takeUntil(this.isDestroyed$),
      filter(([_, item]) => item.type === 'decoy'), // only decoy window
      filter(([buttons, _]) => buttons.some(b => b) && !this.guessedAlready) // pressed something and haven't pressed yet
    ).subscribe(([buttons, item]) => {
      this.guessedAlready = true;
      // interrupt immediately ?
      this.onDecoyFail();
    });
  }

  private onThrowBreakSuccess(item: TimelineItem): void {
    // console.log('GOOD GUESS');
    this.score.breaks.success += 1;

    // we play immediately, not pushing to timeline
    this.videoElementRef.nativeElement.src = item.resultSrc.success;
    this.videoElementRef.nativeElement.play();
  }

  private onThrowBreakFail(item: TimelineItem): void {
    // console.log('WRONG GUESS');
    this.score.breaks.fail += 1;

    // we push to timeline and let it play after 'break' ends
    this.timeline.push({
      type: 'result-fail',
      src: item.resultSrc.fail
    });
  }

  private onThrowBreakMissed(item: TimelineItem): void {
    // console.log('MISSED WINDOW')
    this.score.breaks.miss += 1;
    // missed window
    this.timeline.push({
      type: 'result-fail',
      src: item.resultSrc.fail
    });
  }

  private onDecoyFail(): void {
    // console.log('PRESSED DURING DECOY');
    this.score.decoys.fail += 1;
  }

  private onDecoySuccess(): void {
    // console.log('GUARDED DURING DECOY');
    this.score.decoys.success += 1;
  }


  ngAfterViewInit(): void {
    // set first item
    this.videoElementRef.nativeElement.src = this.currentTimelineItem$.getValue().src;

    this.videoElementRef.nativeElement.onended = (ev) => {
      // notify hook
      const item = this.currentTimelineItem$.getValue();
      const {type} = item;
      if (type === 'break' && !this.guessedAlready) {
        this.onThrowBreakMissed(item);
      } else if (type === 'decoy' && !this.guessedAlready) {
        this.onDecoySuccess();
      }

      // generate new timeline if we reached end, reset guess flag
      if (this.timeline.length === 0) {
        // this.canvasElement.nativeElement.getContext('2d');
        this.guessedAlready = false;
        this.timeline = createTimeline(this.neutralRange, this.decoyRange.from, this.desiredThrows);
      }

      // otherwise get new item
      const nextItem = this.timeline.shift();
      this.currentTimelineItem$.next(nextItem);

      // set it as a source
      this.videoElementRef.nativeElement.src = nextItem.src;
      this.videoElementRef.nativeElement.play();
    };

    // necessary canvas setup
    const ctx = this.canvasElement.nativeElement.getContext('2d');
    const {width, height} = this.videoElementRef.nativeElement;
    this.canvasElement.nativeElement.width = width;
    this.canvasElement.nativeElement.height = height;

    // start drawing
    this.draw(ctx, width, height);

  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }

  public draw(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    ctx.drawImage(this.videoElementRef.nativeElement, 0, 0, width, height);
    requestAnimationFrame(() => this.draw(ctx, width, height));
  }

  public onGamepadSelected(gamepad: Gamepad): void {
    console.log('selected', gamepad);
    this.gamepadService.selectedGamepad = gamepad;
  }

  public toggleDesiredThrow(throwType: ThrowType): void {
    this.desiredThrows = getToggledProperties(this.desiredThrows, throwType, true);
  }

}

type TimelineType = 'neutral' | 'start' | 'break' | 'result-fail' | 'result-success' | 'decoy';

interface TimelineItem {
  type: TimelineType;
  src: string;
  breakButtons?: boolean[];
  resultSrc?: { // only when type is break
    fail: string;
    success: string;
  };
}

const createTimeline = (neutralRange: NumberRange, decoyChance: number, desiredThrows: ThrowType[] = ['throw-1', 'throw-1+2', 'throw-2']): TimelineItem[] => {
  const timeline: TimelineItem[] = [];

  let neutralCount;
  if (neutralRange.from === neutralRange.to) {
    neutralCount = neutralRange.from;
  } else {
    neutralCount = getRandomNumber(neutralRange.from, neutralRange.to);
  }

  // generate n amount of neutral steps
  for (let i = 0; i < neutralCount; i++) {
    timeline.push({
      type: 'neutral',
      src: 'assets/videos/throw-breaks/paul/neutral.mp4'
    });
  }

  // add decoy based on chance
  if (decoyChance > 0) {
    const rand = Math.random();
    if (rand < decoyChance) {
      timeline.push({
        type: 'decoy',
        src: `assets/videos/throw-breaks/paul/decoy-${getRandomNumber(1, 3)}.mp4`
      });
      return timeline;
    }
  }

  // add throw attempt
  const randThrow = desiredThrows[Math.floor(Math.random() * desiredThrows.length)];
  // const randThrow: ThrowType = 'throw-1';

  // startup
  timeline.push({
    type: 'start',
    src: `assets/videos/throw-breaks/paul/${randThrow}/start.mp4`
  });

  // break window
  timeline.push({
    type: 'break',
    src: `assets/videos/throw-breaks/paul/${randThrow}/break.mp4`,
    resultSrc: {
      fail: `assets/videos/throw-breaks/paul/${randThrow}/result-fail.mp4`,
      success: `assets/videos/throw-breaks/paul/${randThrow}/result-success.mp4`,
    },
    breakButtons: getBreakRule(randThrow)
  });

  return timeline;
};

const getBreakRule = (throwType: ThrowType): boolean[] => {
  switch (throwType) {
    case 'throw-1':
      return [true, false];
    case 'throw-2':
      return [false, true];
    case 'throw-1+2':
      return [true, true];
  }
};

type ThrowType = 'throw-1' | 'throw-1+2' | 'throw-2';

export const compareBooleans = (a1: boolean[], a2: boolean[]): boolean => {
  // assumes a1 and a2 are equal length
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }

  return true;
};
