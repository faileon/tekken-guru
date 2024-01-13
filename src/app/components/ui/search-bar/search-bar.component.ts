import {Component, Input, OnDestroy, OnInit, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {Form, UntypedFormControl} from '@angular/forms';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'tg-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @ViewChild('inputElement', {static: true})
  private inputElement!: ElementRef<HTMLInputElement>;

  private isDestroyed$ = new Subject<boolean>();

  @Input()
  public debounceTime = 175;

  @Input()
  public searchText = '';

  @Output()
  public searched = new EventEmitter<string>();

  public searchControl: UntypedFormControl;


  ngOnInit(): void {
    this.searchControl = new UntypedFormControl(this.searchText ?? '');

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

  public onSubmit(event: Event): void {
    console.log('SUBMIT', event);
    this.inputElement.nativeElement.blur();
  }

}
