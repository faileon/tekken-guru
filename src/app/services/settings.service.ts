import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _displayVideos: BehaviorSubject<boolean>;
  public displayVideos$: Observable<boolean>;

  constructor() {
    this._displayVideos = new BehaviorSubject<boolean>(true);
    this.displayVideos$ = this._displayVideos.asObservable();
  }

  public toggleDisplayVideos(): void {
    this._displayVideos.next(!this._displayVideos.value);
  }
}
