import {Component, OnDestroy, OnInit} from '@angular/core';
import {GamepadService} from '../../../services/gamepad.service';
import {BehaviorSubject, combineLatest, forkJoin, interval, Observable, Subject} from 'rxjs';
import {bufferCount, filter, map, pairwise, skip, startWith, take, takeUntil, tap} from 'rxjs/operators';
import {NumberRange, PlayerSide, ThrowType, TimelineItem} from '../../../types';
import {compareBoolArrays, getRandomNumber, getToggledProperties} from '../../../utils/common';
import {ButtonsMapping} from '../../../types/buttons.type';
import {HttpClient} from '@angular/common/http';
import {appendBufferAsync, createSequenceSourceBuffer} from '../../../utils/media-source.utils';
import {getBreakRule} from '../../../utils/practice.utils';

@Component({
  selector: 'tg-practice-screen',
  templateUrl: './practice-screen.component.html',
  styleUrls: ['./practice-screen.component.scss'],
  providers: [
    GamepadService
  ]
})
export class PracticeScreenComponent implements OnDestroy, OnInit {
  private isDestroyed$ = new Subject<boolean>();

  public gamepads$: Observable<Gamepad[]>;
  public selectedGamepad$: Observable<Gamepad>;
  public pressedButtons$: Observable<boolean[]>; // max-size:2, notation press: [one, two]
  public buttonsMapping$: Observable<ButtonsMapping>;

  // settings
  public neutralRange: NumberRange = {from: 1, to: 3}; // 1 - 5
  public decoyRange: NumberRange = {from: 0.0}; // 0 - 1
  public desiredThrows: ThrowType[] = ['throw-1', 'throw-2', 'throw-1+2'];
  public desiredPlayerSide: PlayerSide[] = ['p1'];
  public playSoundEffects = true;
  public playbackSpeed: NumberRange = {from: 1.0};

  // flag about pressing
  public guessedAlready = false;

  // flag about mapping
  public changeMapping = false;

  private timeline$: Subject<TimelineItem[]>;
  public video: HTMLVideoElement;
  private sourceBuffer: SourceBuffer;
  private mediaSource = new MediaSource();

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
    },
    reactionTime: {
      last: 0,
      cumulative: 0
    }
  };

  // for mapping
  public buttonsToMap$: Subject<number> = new Subject<number>();
  public currentButtonToMap$: BehaviorSubject<string> = new BehaviorSubject<string>('1');


  constructor(private gamepadService: GamepadService, private http: HttpClient) {
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

    // timeline v2
    this.timeline$ = new Subject<TimelineItem[]>();


    // INPUT QUEUE
    combineLatest([
      this.pressedButtons$,
      this.timeline$
    ]).pipe(
      takeUntil(this.isDestroyed$),
      map(([buttons, timeline]) => {
        const {currentTime} = this.video;
        const currentTimelineItem = timeline.find(t => t.start < currentTime && t.end > currentTime);
        return {
          currentTimelineItem,
          buttons,
          timeline
        };
      }),
      filter(({buttons}) => buttons.some(b => b) && !this.guessedAlready) // pressed something and haven't guessed yet
    ).subscribe(({buttons, currentTimelineItem}) => {
      // console.log('pressed during break', currentTimelineItem);

      switch (currentTimelineItem?.type) {
        case 'break':
          this.guessedAlready = true;
          // did you guess right tho? compare buttons if they match
          if (compareBoolArrays(buttons, currentTimelineItem.breakButtons)) {
            return this.onThrowBreakSuccess(currentTimelineItem);
          } else {
            return this.onThrowBreakFail(currentTimelineItem);
          }
        case 'decoy':
          // pressed during decoy... no no
          this.guessedAlready = true;
          return this.onDecoyFail();
      }
    });
  }

  async ngOnInit(): Promise<void> {

    // create media source
    this.video = document.getElementById('media-source-test') as HTMLVideoElement;
    this.video.src = URL.createObjectURL(this.mediaSource);

    // append to media source and update timline with start and end
    this.mediaSource.onsourceopen = async () => {
      // console.log('media source open');
      this.watchCurrentEndWindow();
      this.guessedAlready = false;

      // generate timeline
      const timeline = await this.createTimeline(this.neutralRange, this.decoyRange.from, this.desiredThrows);

      this.sourceBuffer = createSequenceSourceBuffer(this.mediaSource);
      for (const item of timeline) {
        // start of the current timeline item
        const start = this.mediaSource.duration || 0;
        // append buffer to media source (this will update the duration and other attributes)
        await appendBufferAsync(this.sourceBuffer, item.buffer);
        // end of the current timeline item
        const end = this.mediaSource.duration;

        // inject time range to timeline item
        item.start = start;
        item.end = end;
      }

      console.log('timeline is', timeline);
      this.timeline$.next(timeline);
    };

    this.video.onended = ev => {
      // console.log('video ended, generate new loop?');
      this.video.src = URL.createObjectURL(this.mediaSource);
      this.video.play();
    };
  }

  private watchCurrentEndWindow(): void {
    combineLatest([
      this.timeline$,
      interval(16).pipe(
        takeUntil(this.isDestroyed$),
        map(() => this.video.currentTime),
        pairwise(),
        filter(([prev, curr]) => {
          return curr > 0.5 && prev > 0.5 && curr === prev;
        }),
      ),
    ])
      .pipe(take(1))
      .subscribe(([timeline, [prev, curr]]) => {
        // console.log('video ended');
        const currentTimelineItem = timeline.find(t => t.start < curr && t.end > curr);

        // video ended and he hasnt guessed
        if (currentTimelineItem?.type === 'break' && !this.guessedAlready) {
          this.onThrowBreakMissed(currentTimelineItem);
        } else if (currentTimelineItem?.type === 'decoy' && !this.guessedAlready) {
          this.onDecoySuccess();
        } else {
          // console.log('ups', currentTimelineItem, this.guessedAlready);
        }
      });
  }

  private onThrowBreakSuccess(item: TimelineItem): void {
    // console.log('GOOD GUESS');
    this.score.breaks.success += 1;
    this.playAudioEffect(true);

    appendBufferAsync(this.sourceBuffer, item.resultBuffers?.success)
      .then(_ => {
        // lets skip the video till the remainder of break window and play break animation immediately
        const timeTillBreakWindowEnds = item.end - this.video.currentTime;
        const reactionTime = this.video.currentTime - item.start;

        // also measure reaction time
        this.score.reactionTime.last = reactionTime;
        this.score.reactionTime.cumulative += reactionTime;

        this.video.currentTime = this.video.currentTime + timeTillBreakWindowEnds;
        this.mediaSource.endOfStream();
      });
  }

  private onThrowBreakFail(item: TimelineItem): void {
    // console.log('WRONG GUESS');
    this.score.breaks.fail += 1;
    this.playAudioEffect(false);

    appendBufferAsync(this.sourceBuffer, item.resultBuffers?.fail)
      .then(_ => {
        this.mediaSource.endOfStream();
      });
  }

  private onThrowBreakMissed(item: TimelineItem): void {
    // console.log('MISSED WINDOW')
    this.score.breaks.miss += 1;
    this.playAudioEffect(false);

    // missed window
    appendBufferAsync(this.sourceBuffer, item.resultBuffers?.fail)
      .then(_ => {
        this.mediaSource.endOfStream();
      });
  }

  private onDecoyFail(): void {
    // console.log('PRESSED DURING DECOY');
    this.score.decoys.fail += 1;
    this.playAudioEffect(false);

    this.mediaSource.endOfStream();
  }

  private onDecoySuccess(): void {
    // console.log('GUARDED DURING DECOY');
    this.score.decoys.success += 1;
    this.playAudioEffect(true);

    this.mediaSource.endOfStream();
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

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }


  public onGamepadSelected(gamepad: Gamepad): void {
    this.gamepadService.selectedGamepad = gamepad;
  }

  public toggleDesiredThrow(throwType: ThrowType): void {
    this.desiredThrows = getToggledProperties(this.desiredThrows, throwType, true);
  }

  public toggleDesiredSide(side: PlayerSide): void {
    this.desiredPlayerSide = getToggledProperties(this.desiredPlayerSide, side, false);
  }

  private async createTimeline(neutralRange: NumberRange, decoyChance: number, desiredThrows: ThrowType[] = ['throw-1', 'throw-1+2', 'throw-2']): Promise<TimelineItem[]> {
    const timeline: TimelineItem[] = [];
    const character = 'drag';

    const neutralCount = (neutralRange.from === neutralRange.to) ? neutralRange.from : getRandomNumber(neutralRange.from, neutralRange.to);
    // generate n amount of neutral steps
    const neutralAB = await this.fetchAsArrayBuffer(`assets/videos/throw-breaks/${character}/neutral.mp4`);
    for (let i = 0; i < neutralCount; i++) {
      timeline.push({
        type: 'neutral',
        buffer: neutralAB,
      });
    }

    // add decoy based on chance
    if (decoyChance > 0) {
      const rand = Math.random();
      if (rand < decoyChance) {
        const decoyAB = await this.fetchAsArrayBuffer(`assets/videos/throw-breaks/${character}/decoy-${getRandomNumber(1, 3)}.mp4`);
        timeline.push({
          type: 'decoy',
          buffer: decoyAB
        });
        return timeline;
      }
    }

    // add throw attempt
    const randThrow = desiredThrows[Math.floor(Math.random() * desiredThrows.length)];

    // startup
    const startAB = await this.fetchAsArrayBuffer(`assets/videos/throw-breaks/${character}/${randThrow}/start.mp4`);
    timeline.push({
      type: 'start',
      buffer: startAB
    });

    // break window
    const breakAB = await this.fetchAsArrayBuffer(`assets/videos/throw-breaks/${character}/${randThrow}/break.mp4`);
    const successAB = await this.fetchAsArrayBuffer(`assets/videos/throw-breaks/${character}/${randThrow}/result-success.mp4`);
    const failAB = await this.fetchAsArrayBuffer(`assets/videos/throw-breaks/${character}/${randThrow}/result-fail.mp4`);
    timeline.push({
      type: 'break',
      buffer: breakAB,
      resultBuffers: {
        fail: failAB,
        success: successAB,
      },
      breakButtons: getBreakRule(randThrow)
    });

    return timeline;
  }

  private fetchAsArrayBuffer(src: string): Promise<ArrayBuffer> {
    return this.http.get(src, {responseType: 'arraybuffer'}).toPromise();
  }
}









