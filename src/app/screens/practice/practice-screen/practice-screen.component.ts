import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GamepadService, GamepadSettingsService} from '../../../services/gamepad.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'tg-practice-screen',
  templateUrl: './practice-screen.component.html',
  styleUrls: ['./practice-screen.component.scss'],
  providers: [
    GamepadSettingsService,
    GamepadService
  ]
})
export class PracticeScreenComponent implements AfterViewInit {

  public gamepads$: Observable<Gamepad[]>;
  public selectedGamepad$: Observable<Gamepad>;
  public pressedButtons$: Observable<boolean[]>; // max-size:2, notation press: [one, two]

  @ViewChild('videoElement')
  private videoElementRef!: ElementRef<HTMLVideoElement>;

  @ViewChild('canvasElement')
  private canvasElement!: ElementRef<HTMLCanvasElement>;

  private _currentVideoSrc: BehaviorSubject<ThrowVideoSrc> = new BehaviorSubject<ThrowVideoSrc>('neutral');
  public currentVideoSrc$ = this._currentVideoSrc.asObservable();

  get currentVideoSrc(): ThrowVideoSrc {
    return this._currentVideoSrc.getValue();
  }

  set currentVideoSrc(src: ThrowVideoSrc) {
    this._currentVideoSrc.next(src);
  }

  constructor(private gamepadSettingsService: GamepadSettingsService, private gamepadService: GamepadService) {
    this.gamepads$ = this.gamepadSettingsService.gamepadList$.pipe(
      map(list => Object.values(list).filter(gamepad => !!gamepad))
    );

    this.selectedGamepad$ = this.gamepadSettingsService.selectedGamepad$;

    this.pressedButtons$ = this.gamepadService.pressedButtons$.pipe(
      map(buttons => {
        return buttons.reduce((acc, curr, index) => {
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
  }

  ngAfterViewInit(): void {
    this.videoElementRef.nativeElement.onended = () => {
      switch (this.currentVideoSrc) {
        case 'neutral':
          this.currentVideoSrc = 'start';
          break;
        case 'start':
          this.currentVideoSrc = 'break';
          break;
        case 'break':
          this.currentVideoSrc = 'result-fail';
          break;
        case 'result-success':
        case 'result-fail':
          this.currentVideoSrc = 'neutral';
          break;
      }

      this.videoElementRef.nativeElement.load();
      this.videoElementRef.nativeElement.play();
    };

    // necessary canvas setup
    const ctx = this.canvasElement.nativeElement.getContext('2d');
    const {width, height} = this.videoElementRef.nativeElement;
    this.canvasElement.nativeElement.width = width;
    this.canvasElement.nativeElement.height = height;

    // start drawing
    this.draw(this.videoElementRef.nativeElement, ctx, width, height);

  }

  public draw(videoElement: HTMLVideoElement, ctx: CanvasRenderingContext2D, width: number, height: number): void {
    ctx.drawImage(videoElement, 0, 0, width, height);
    requestAnimationFrame(() => this.draw(videoElement, ctx, width, height));
  }

  public onGamepadSelected(gamepad: Gamepad): void {
    console.log('selected', gamepad);
    this.gamepadSettingsService.selectedGamepad = gamepad;
  }

}

type ThrowVideoSrc = 'neutral' | 'start' | 'break' | 'result-fail' | 'result-success';
