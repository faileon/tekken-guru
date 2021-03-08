import {Component, OnDestroy, OnInit} from '@angular/core';
import {GamepadService} from '../../../services/gamepad.service';
import {BehaviorSubject, combineLatest, interval, Observable, Subject, Subscription} from 'rxjs';
import {bufferCount, filter, map, pairwise, take, takeUntil, tap} from 'rxjs/operators';
import {Character, NumberRange, PlayerSide, ThrowType, TimelineItem} from '../../../types';
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
  public decoyRange: NumberRange = {from: 0.15}; // 0 - 1
  public desiredThrows: ThrowType[] = ['throw-1', 'throw-2', 'throw-1+2'];
  public playSoundEffects = true;
  public playbackSpeed: NumberRange = {from: 1.0};

  public selectedPlayerSide$: BehaviorSubject<PlayerSide> = new BehaviorSubject<PlayerSide>('p1');
  public player1Icon = {
    prefix: 'tg',
    iconName: 'player-1',
    // @ts-ignore
    icon: [
      250,
      250,
      [],
      '',
      'M85.6 108.4c-3.1 8.7-4.7 18.1-4.7 27.9 0 46.7 37.9 84.6 84.6 84.6 46.7 0 84.6-37.9 84.6-84.6 0-29.5-15.1-55.5-38-70.6-13.4-8.8-29.3-14-46.5-14-37.1.1-68.5 23.8-80 56.7zm52.9 23.4v41.7c0 2.1-1.7 3.8-3.8 3.8h-8c-2.1 0-3.8-1.7-3.8-3.8v-51.2c0-2.1-1.2-2.6-2.9-1.3-4.1 3.3-8.7 6-13.7 8-1.9.8-3.6-.4-3.6-2.5v-6.6c0-2.1 1.6-4.3 3.5-5.2.7-.3 1.5-.7 2.3-1.2 2.4-1.3 4.9-3 7.5-5 3.6-2.8 6.4-6 8.3-9.6 1-1.8 3.2-3.5 5.3-3.5h5.1c2.1 0 3.8 1.7 3.8 3.8v32.6zm30.6-36h22.6c10 0 16.5.4 19.5 1.2 1.2.3 2.3.7 3.4 1.2 2.1 1 4.1 2.2 5.8 3.9 1.5 1.4 3.6 4.2 4.5 6 1.8 3.5 2.7 7.8 2.7 12.6 0 5-.9 9.2-2.7 12.6-1.8 3.4-4.1 6.1-6.9 8-2.8 1.9-5.6 3.2-8.5 3.9h-.2c-3.9.8-9.5 1.1-16.8 1.1h-6.9c-2.1 0-3.8 1.7-3.8 3.8v23.1c0 2.1-1.7 3.8-3.8 3.8h-8.9c-2.1 0-3.8-1.7-3.8-3.8V99.6c0-2.1 1.7-3.8 3.8-3.8zm16.4 36.9h5.2c6.5 0 10.8-.4 13-1.3 1.1-.4 2-1 2.9-1.6 1.4-1.1 3.2-3.6 3.7-5.4.3-1 .4-2.1.4-3.3 0-3-.9-5.4-2.6-7.3-1.7-1.9-3.9-3.1-6.6-3.6-2-.4-5.9-.6-11.8-.6h-4.2c-2.1 0-3.8 1.7-3.8 3.8v15.5c0 2.1 1.7 3.8 3.8 3.8zm21.8-76.1c-13.4-8.1-29.1-12.9-46-12.9-38.7 0-71.6 24.8-83.6 59.3-3.2 9.2-5 19-5 29.3 0 4.7.4 9.3 1.1 13.9-14.2 4.9-20.4 12.9-31 21.5C25.7 181.8 4.7 196.1.6 151.3c-4.1-44.8 13.9-90.5 22.5-104.7 8.6-14.2 40.1-23.5 50.3-13.3 10.2 10.2 39.3 9.2 39.3 9.2s29 1 39.3-9.2c10.2-10.2 41.7-.9 50.3 13.3 1.4 2.5 3.2 5.9 5 10z'
    ]
    // tslint:disable-next-line:no-any
  } as any;
  public player2Icon = {
    prefix: 'tg',
    iconName: 'player-1',
    // @ts-ignore
    icon: [
      250,
      250,
      [],
      '',
      'M212 65.8c-13.3-8.8-29.3-14-46.5-14-36.9 0-68.3 23.6-79.8 56.6-3.1 8.7-4.7 18.1-4.7 27.9 0 46.7 37.8 84.5 84.5 84.5S250 183 250 136.3c0-29.4-15.1-55.3-38-70.5zm-84.5 97h23.4c2.1 0 3.8 1.7 3.8 3.8v6.9c0 2.1-1.7 3.8-3.8 3.8h-47.1c-2.1 0-3.6-1.7-3.2-3.7.9-4.1 2.5-8.1 4.7-11.8 3-4.9 8.8-11.4 17.5-19.5 6.7-6.3 10.9-10.6 12.7-13 .1-.1.2-.2.2-.3 2.1-3.2 3.2-6.4 3.2-9.5 0-1.8-.3-3.5-.8-4.8-.7-2-3.2-4.5-5.2-5.2-1.3-.5-2.9-.8-4.6-.8-3.3 0-5.8 1-7.8 2.9-1.3 1.4-2.3 3.3-2.8 6v.1c-.4 2-2.2 3.6-4.3 3.4l-8-.8c-2.1-.2-3.6-2.1-3.2-4.1.3-1.4.6-2.7 1-3.9 1.5-4.7 3.8-8.3 7.1-10.8 4.9-3.7 11-5.6 18.3-5.6 8 0 14.3 2.2 18.9 6.5 4.6 4.3 6.9 9.7 6.9 16.2 0 3.7-.7 7.1-2 10.5-1.3 3.3-3.3 6.7-6.1 10.2 0 .1-.1.1-.1.2-1.9 2.4-5.3 5.9-10.2 10.4-4.9 4.5-8 7.5-9.4 9-.6.7-1.2 1.4-1.7 2.1-.6.7.5 1.8 2.6 1.8zM231 120.9c0 5-.9 9.2-2.7 12.6-1.8 3.4-4.1 6.1-6.9 8-2.8 1.9-5.6 3.2-8.5 3.9-1.1.2-2.3.4-3.7.5-3.5.4-8 .6-13.3.6H189c-2.1 0-3.8 1.7-3.8 3.8v23.1c0 2.1-1.7 3.8-3.8 3.8h-8.9c-2.1 0-3.8-1.7-3.8-3.8V99.7c0-2.1 1.7-3.8 3.8-3.8H195c10 0 16.5.4 19.5 1.2h.1c3.5.9 6.5 2.6 9.1 5.1 1.5 1.4 3.6 4.2 4.5 6 1.9 3.6 2.8 7.8 2.8 12.7zm-19.6-7.1c-1.7-1.9-3.9-3.1-6.6-3.6-2-.4-5.9-.6-11.8-.6h-4.1c-2.1 0-3.8 1.7-3.8 3.8V129c0 2.1 1.7 3.8 3.8 3.8h5.2c6.5 0 10.8-.4 13-1.3 1.1-.4 2-1 2.9-1.6 1.3-1 2.8-3.1 3.4-4.8.1-.2.2-.4.2-.6.3-1 .4-2.1.4-3.3 0-.6-.1-1.2-.1-1.7-.3-2.2-1.1-4.1-2.5-5.7zm-137.8 19c0 4.4.3 8.8 1 13.1-14.8 4.8-21 13-31.8 21.8C25.7 181.8 4.7 196.1.6 151.3c-4.1-44.8 13.9-90.4 22.5-104.6 8.6-14.2 40-23.5 50.3-13.3 10.2 10.2 39.3 9.2 39.3 9.2s29 1 39.3-9.2c10.2-10.2 41.7-.9 50.3 13.3 1.6 2.6 3.5 6.3 5.5 10.8-13.4-8.1-29-12.8-45.8-12.8-38.5 0-71.2 24.7-83.2 59.1-3.4 9-5.2 18.8-5.2 29z'
    ]
    // tslint:disable-next-line:no-any
  } as any;

  public availableCharacters: Character[] = [
    {
      _id: 'paul',
      fullName: 'Paul Phoenix',
      avatar: 'avatars/paul.png',
    },
    {
      _id: 'dragunov',
      fullName: 'Sergei Dragunov',
      avatar: 'avatars/dragunov.png',
    }
  ];
  private _selectedCharacter: BehaviorSubject<Character> = new BehaviorSubject(this.availableCharacters[0]);
  public selectedCharacter$ = this._selectedCharacter.asObservable();

  public isLoading = true;

  // flag about pressing
  public guessedAlready = false;

  // flag about mapping
  public changeMapping = false;

  private currentLoop$ = new BehaviorSubject<number>(1);
  private currentVideoEndSubscription: Subscription;
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

  ngOnInit(): void {
    // create media source
    this.video = document.getElementById('media-source-test') as HTMLVideoElement;

    const mainLoop$ = combineLatest([
      this.selectedCharacter$,
      this.selectedPlayerSide$,
      this.currentLoop$
    ]).pipe(
      takeUntil(this.isDestroyed$),
      map(async ([character, playerSide, loop]) => {
        this.isLoading = true;

        const timeline = await this.createTimeline(this.neutralRange, this.decoyRange.from, this.desiredThrows, character, playerSide);

        // open up the source again
        this.video.src = URL.createObjectURL(this.mediaSource);

        // remake sourceopen function
        this.mediaSource.onsourceopen = async () => {
          // console.log('media source open');
          if (this.currentVideoEndSubscription && !this.currentVideoEndSubscription.closed) {
            this.currentVideoEndSubscription.unsubscribe();
          }

          this.currentVideoEndSubscription = this.watchCurrentEndWindow();
          this.guessedAlready = false;

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

          this.timeline$.next(timeline);
        };

        if (loop > 1) {
          await this.video.play();
        }

        this.isLoading = false;
        return timeline;
      })
    );

    mainLoop$.subscribe(async timeline => {
      console.log('timeline', await timeline);

    });

    this.video.onended = ev => {
      // console.log('video ended, generate new loop?');
      this.currentLoop$.next(this.currentLoop$.getValue() + 1);
    };
  }

  private watchCurrentEndWindow(): Subscription {
    return combineLatest([
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

  public onCharacterSelected(character: Character): void {
    this._selectedCharacter.next(character);
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
    // dirty hack due to async of two update loops (buttons pressed and video ended watcher) - you can miss window and break it/fail to break it at the same time.
    if (this.mediaSource.readyState === 'open' && !this.sourceBuffer.updating) {
      console.log('MISSED WINDOW');
      this.score.breaks.miss += 1;
      this.playAudioEffect(false);

      // missed window
      appendBufferAsync(this.sourceBuffer, item.resultBuffers?.fail)
        .then(_ => {
          this.mediaSource.endOfStream();
        });
    }
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

  public onDesiredSideSelected(side: PlayerSide): void {
    this.selectedPlayerSide$.next(side);
  }

  private async createTimeline(
    neutralRange: NumberRange,
    decoyChance: number,
    desiredThrows: ThrowType[] = ['throw-1', 'throw-1+2', 'throw-2'],
    character: Character,
    playerSide: PlayerSide): Promise<TimelineItem[]> {

    const timeline: TimelineItem[] = [];
    const {_id} = character;
    const prefix = `assets/videos/throw-breaks/${_id}/${playerSide}`;

    const neutralCount = (neutralRange.from === neutralRange.to) ? neutralRange.from : getRandomNumber(neutralRange.from, neutralRange.to);
    // generate n amount of neutral steps
    const neutralAB = await this.fetchAsArrayBuffer(`${prefix}/neutral.mp4`);
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
        const decoyAB = await this.fetchAsArrayBuffer(`${prefix}/decoy-${getRandomNumber(1, 3)}.mp4`);
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
    const startAB = await this.fetchAsArrayBuffer(`${prefix}/${randThrow}/start.mp4`);
    timeline.push({
      type: 'start',
      buffer: startAB
    });

    // break window
    const breakAB = await this.fetchAsArrayBuffer(`${prefix}/${randThrow}/break.mp4`);
    const successAB = await this.fetchAsArrayBuffer(`${prefix}/${randThrow}/result-success.mp4`);
    const failAB = await this.fetchAsArrayBuffer(`${prefix}/${randThrow}/result-fail.mp4`);
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









