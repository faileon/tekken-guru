import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, switchMap} from 'rxjs/operators';

@Injectable()
export class GamepadService {
  public pressedButtons$: Observable<readonly GamepadButton[]>;


  constructor(private gamepadSettingsService: GamepadSettingsService) {
    console.log('created gamepad service!!!!!!!!!!!!');
    this.pressedButtons$ = this.gamepadSettingsService.selectedGamepad$.pipe(
      switchMap(gamepad => {
        return interval(16).pipe(
          map(_ => navigator.getGamepads()[gamepad.index].buttons),
          distinctUntilChanged()
        );
      }),
    );


    // this.pressedButtons$.subscribe(buttons => {
    //   console.log('PRESSED BUTTONS', buttons);
    // });
  }
}

@Injectable()
export class GamepadSettingsService {
  private _gamepadList: BehaviorSubject<{ [key: number]: Gamepad }>;
  public gamepadList$: Observable<{ [key: number]: Gamepad }>;

  private _selectedGamepad = new Subject<Gamepad>();
  public selectedGamepad$ = this._selectedGamepad.asObservable();

  set selectedGamepad(gamepad: Gamepad) {
    this._selectedGamepad.next(gamepad);
  }

  constructor() {
    this._gamepadList = new BehaviorSubject<{ [key: number]: Gamepad }>(navigator.getGamepads());
    this.gamepadList$ = this._gamepadList.asObservable();

    // whenever gamepad connects, refetch gamepad list
    window.addEventListener('gamepadconnected', evt => {
      const {gamepad} = evt as GamepadEvent;
      this._gamepadList.next(navigator.getGamepads());
    });

    // whenever gamepad disconnects, refetch gamepad list
    window.addEventListener('gamepaddisconnected', evt => {
      this._gamepadList.next(navigator.getGamepads());
    });
  }
}
