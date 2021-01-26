import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PlatformInput} from '../types/buttons.type';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _displayVideos: BehaviorSubject<boolean>;
  public displayVideos$: Observable<boolean>;

  private _platformInput: BehaviorSubject<PlatformInput>;
  public platformInput$: Observable<PlatformInput>;

  constructor() {
    this._displayVideos = new BehaviorSubject<boolean>(true);
    this.displayVideos$ = this._displayVideos.asObservable();

    const defaultPlatformInput = localStorage.getItem('platformInput') as PlatformInput ?? 'ps4';
    this._platformInput = new BehaviorSubject<PlatformInput>(defaultPlatformInput);
    this.platformInput$ = this._platformInput.asObservable();
  }

  public toggleDisplayVideos(): void {
    this._displayVideos.next(!this._displayVideos.value);
  }

  public set platformInput(input: PlatformInput) {
    localStorage.setItem('platformInput', input);
    this._platformInput.next(input);
  }
}
