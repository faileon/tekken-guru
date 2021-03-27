import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ButtonsMapping, PlatformInput} from '../types/buttons.type';
import {ContentOrder} from '../types';
import {getDefaultValueFromLocalStorage} from '../utils/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _displayVideos: BehaviorSubject<boolean>;
  public displayVideos$: Observable<boolean>;

  private _platformInput: BehaviorSubject<PlatformInput>;
  public platformInput$: Observable<PlatformInput>;

  private _contentOrder: BehaviorSubject<ContentOrder>;
  public contentOrder$: Observable<ContentOrder>;

  constructor() {
    this._displayVideos = new BehaviorSubject<boolean>(true);
    this.displayVideos$ = this._displayVideos.asObservable();

    const defaultPlatformInput = localStorage.getItem('platformInput') as PlatformInput ?? 'ps4';
    this._platformInput = new BehaviorSubject<PlatformInput>(defaultPlatformInput);
    this.platformInput$ = this._platformInput.asObservable();

    const defaultContentOrder = getDefaultValueFromLocalStorage<ContentOrder>('contentOrder') ?? {notation: 0, video: 1, frameData: 2};
    this._contentOrder = new BehaviorSubject<ContentOrder>(defaultContentOrder);
    this.contentOrder$ = this._contentOrder.asObservable();
  }

  public toggleDisplayVideos(): void {
    this._displayVideos.next(!this._displayVideos.value);
  }

  public set platformInput(input: PlatformInput) {
    localStorage.setItem('platformInput', input);
    this._platformInput.next(input);
  }

  public set contentOrder(order: ContentOrder) {
    localStorage.setItem('contentOrder', JSON.stringify(order));
    this._contentOrder.next(order);
  }

  public get contentOrder(): ContentOrder {
    return this._contentOrder.getValue();
  }
}
