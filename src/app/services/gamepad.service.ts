import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';

@Injectable()
export class GamepadService {
  private _gamepadList: BehaviorSubject<{ [key: number]: Gamepad }>;
  public gamepadList$: Observable<{ [key: number]: Gamepad }>;

  private _selectedGamepad = new Subject<Gamepad>();
  public selectedGamepad$ = this._selectedGamepad.asObservable();

  public pressedButtons$: Observable<readonly GamepadButton[]>;

  set selectedGamepad(gamepad: Gamepad) {
    this._selectedGamepad.next(gamepad);
  }

  constructor() {
    this._gamepadList = new BehaviorSubject<{ [key: number]: Gamepad }>(navigator.getGamepads());
    this.gamepadList$ = this._gamepadList.asObservable();

    this.pressedButtons$ = this.selectedGamepad$.pipe(
      switchMap(gamepad => {
        return interval(16).pipe(
          map(_ => navigator.getGamepads()[gamepad.index].buttons),
          distinctUntilChanged(),
          // filter(buttons => buttons.every(b => !b))
        );
      }),
    );

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
