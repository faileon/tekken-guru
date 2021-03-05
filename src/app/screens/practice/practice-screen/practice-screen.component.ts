import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GamepadService} from '../../../services/gamepad.service';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {bufferCount, count, distinct, distinctUntilChanged, filter, map, startWith, take, takeUntil, tap} from 'rxjs/operators';
import {NumberRange} from '../../../types';
import {getRandomNumber, getToggledProperties} from '../../../utils/common';
import {ButtonsMapping} from '../../../types/buttons.type';

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
  public buttonsMapping$: Observable<ButtonsMapping>;

  @ViewChild('canvasElement')
  private canvasElement!: ElementRef<HTMLCanvasElement>;

  @ViewChild('videoElement')
  private videoElementRef!: ElementRef<HTMLVideoElement>;

  // settings
  public neutralRange: NumberRange = {from: 1, to: 3}; // 1 - 5
  public decoyRange: NumberRange = {from: 0.15}; // 0 - 1
  public desiredThrows: ThrowType[] = ['throw-1', 'throw-2', 'throw-1+2'];
  public playSoundEffects = true;
  public playbackSpeed: NumberRange = {from: 1.0};

  // flag about pressing
  public guessedAlready = false;

  // flag about mapping
  public changeMapping = false;

  // track timeline and current item
  private timeline: TimelineItem[];
  public currentTimelineItem$: BehaviorSubject<TimelineItem>;

  // sound effects
  private audioSuccess = new Audio('/assets/audio/effects/success.mp4');
  private audioFail = new Audio('/assets/audio/effects/fail.mp4');

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

  // for mapping
  public buttonsToMap$: Subject<number> = new Subject<number>();
  public currentButtonToMap$: BehaviorSubject<string> = new BehaviorSubject<string>('1');


  constructor(private gamepadService: GamepadService) {
    this.gamepads$ = this.gamepadService.gamepadList$.pipe(map(list => Object.values(list).filter(gamepad => !!gamepad)));
    this.selectedGamepad$ = this.gamepadService.selectedGamepad$;
    this.buttonsMapping$ = this.gamepadService.buttonsMapping$;

    // watch mapper
    let counter = 1;
    this.buttonsToMap$.pipe(
      takeUntil(this.isDestroyed$),
      tap(_ => {
        counter += 1;
        if (counter === 2) {
          this.currentButtonToMap$.next('2');
        } else {
          this.currentButtonToMap$.next('1+2');
        }
      }),
      bufferCount(3)
    ).subscribe(buttonsToMap => {
      const [one, two, onePlusTwo] = buttonsToMap;

      this.gamepadService.buttonsMapping = {
        one,
        two,
        onePlusTwo
      };

      this.changeMapping = false;
      counter = 1;
      this.currentButtonToMap$.next('1');
    });

    // watch pressed buttons for mapper
    this.gamepadService.pressedButtons$.pipe(
      filter((buttons) => buttons.some(b => b.pressed)),
      filter(_ => this.changeMapping),
      takeUntil(this.isDestroyed$)
    ).subscribe(buttons => {
      const pressedButton = buttons.findIndex(button => button.pressed);
      this.buttonsToMap$.next(pressedButton);
    });

    // pressed buttons for throw break
    this.pressedButtons$ = combineLatest([
      this.gamepadService.pressedButtons$,
      this.gamepadService.buttonsMapping$,
    ]).pipe(
      map(([buttons, mapping]) => {
        return buttons.reduce((acc, curr, index) => {
          if (index === (mapping?.one ?? 2) && curr.pressed) {
            acc[0] = true;
          }
          if (index === (mapping?.two ?? 3) && curr.pressed) {
            acc[1] = true;
          }
          if (index === (mapping?.onePlusTwo ?? 5) && curr.pressed) {
            acc[0] = true;
            acc[1] = true;
          }
          return acc;
        }, [false, false] as boolean[]);
      })
    );

    // init timeline
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

  private prefetchVideos(): void {
    // shared
    const list: string[] = [
      `assets/videos/throw-breaks/paul/decoy-1.mp4`,
      `assets/videos/throw-breaks/paul/decoy-2.mp4`,
      `assets/videos/throw-breaks/paul/decoy-3.mp4`,
      `assets/videos/throw-breaks/paul/neutral.mp4`,
    ];

    // throw
    const throws = ['throw-1', 'throw-1+2', 'throw-2'];
    for (const t of throws) {
      const assets = [
        `assets/videos/throw-breaks/paul/${t}/break.mp4`,
        `assets/videos/throw-breaks/paul/${t}/result-fail.mp4`,
        `assets/videos/throw-breaks/paul/${t}/result-success.mp4`,
        `assets/videos/throw-breaks/paul/${t}/start.mp4`,
      ];
      list.push(...assets);
    }

    const promises = list.map(url => fetch(url));
    Promise.all(promises)
      .then(res => {
        console.log('fetch all success', res);
      })
      .catch(e => {
        console.log('fetch all error', e);
      });
  }


  private onThrowBreakSuccess(item: TimelineItem): void {
    // console.log('GOOD GUESS');
    this.score.breaks.success += 1;
    this.playAudioEffect(true);

    // we play immediately, not pushing to timeline
    this.videoElementRef.nativeElement.src = item.resultSrc.success;
    this.videoElementRef.nativeElement.play();
  }

  private onThrowBreakFail(item: TimelineItem): void {
    // console.log('WRONG GUESS');
    this.score.breaks.fail += 1;
    this.playAudioEffect(false);

    // we push to timeline and let it play after 'break' ends
    this.timeline.push({
      type: 'result-fail',
      src: item.resultSrc.fail
    });
  }

  private onThrowBreakMissed(item: TimelineItem): void {
    // console.log('MISSED WINDOW')
    this.score.breaks.miss += 1;
    this.playAudioEffect(false);

    // missed window
    this.timeline.push({
      type: 'result-fail',
      src: item.resultSrc.fail
    });
  }

  private onDecoyFail(): void {
    // console.log('PRESSED DURING DECOY');
    this.score.decoys.fail += 1;
    this.playAudioEffect(false);
  }

  private onDecoySuccess(): void {
    // console.log('GUARDED DURING DECOY');
    this.score.decoys.success += 1;
    this.playAudioEffect(true);

  }

  private playAudioEffect(success: boolean): void {
    if (this.playSoundEffects) {
      if (success) {
        this.audioSuccess.play();
      } else {
        this.audioFail.play();
      }
    }
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
