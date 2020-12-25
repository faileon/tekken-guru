import {Component, Input, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import {Form, FormControl} from '@angular/forms';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'tg-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private isDestroyed$ = new Subject<boolean>();

  @Input()
  public debounceTime = 175;

  @Input()
  public searchText = '';

  @Output()
  public searched = new EventEmitter<string>();

  public searchControl: FormControl;


  ngOnInit(): void {
    this.searchControl = new FormControl(this.searchText ?? '');

    this.searchControl.valueChanges.pipe(
      takeUntil(this.isDestroyed$),
      debounceTime(this.debounceTime)
    ).subscribe(text => this.searched.emit(text));
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }

  public resetText(): void {
    this.searchControl.setValue('');
  }

}
