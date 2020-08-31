import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TGTab} from '../../../types/ui.types';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'tg-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {
  private isDestroyed$: Subject<boolean> = new Subject<boolean>();

  @Input()
  public tabs$!: Observable<TGTab[]> | null;

  public tabs: TGTab[] = [];

  ngOnInit(): void {
    this.tabs$?.pipe(
      takeUntil(this.isDestroyed$)
    ).subscribe(tabs => this.tabs = tabs);
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }

}


