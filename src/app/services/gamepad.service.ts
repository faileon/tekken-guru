import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subject} from 'rxjs';
import {distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {ButtonsMapping} from '../types/buttons.type';
import {getDefaultValueFromLocalStorage} from '../utils/common';

@Injectable()
export class GamepadService {
  private _gamepadList: BehaviorSubject<{ [key: number]: Gamepad }>;
  public gamepadList$: Observable<{ [key: number]: Gamepad }>;

  private _selectedGamepad = new Subject<Gamepad>();
  public selectedGamepad$ = this._selectedGamepad.asObservable();

  public pressedButtons$: Observable<readonly GamepadButton[]>;

  private _buttonsMapping: BehaviorSubject<ButtonsMapping>;
  public buttonsMapping$: Observable<ButtonsMapping>;

  set selectedGamepad(gamepad: Gamepad) {
    this._selectedGamepad.next(gamepad);
  }

  set buttonsMapping(mapping: ButtonsMapping) {
    // console.log('setting mapping', mapping);
    localStorage.setItem('buttonsMapping', JSON.stringify(mapping));
    this._buttonsMapping.next(mapping);
  }

  constructor() {
    this._gamepadList = new BehaviorSubject<{ [key: number]: Gamepad }>(navigator.getGamepads());
    this.gamepadList$ = this._gamepadList.asObservable();

    const defaultButtonsMapping = getDefaultValueFromLocalStorage<ButtonsMapping>('buttonsMapping') ?? {one: 2, two: 3, onePlusTwo: 5};
    this._buttonsMapping = new BehaviorSubject<ButtonsMapping>(defaultButtonsMapping);
    this.buttonsMapping$ = this._buttonsMapping.asObservable();

    this.pressedButtons$ = this.selectedGamepad$.pipe(
      switchMap(gamepad => {
        return interval(16).pipe(
          map(_ => navigator.getGamepads()[gamepad.index].buttons),
          distinctUntilChanged()
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


