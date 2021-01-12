import {Component, ElementRef, HostListener, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {IconProp, SizeProp} from '@fortawesome/fontawesome-svg-core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';


@Component({
  selector: 'tg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input()
  public icon?: IconProp;

  @Input()
  public iconSize: SizeProp = 'lg';

  @Input()
  public outlined = true;

  @Input()
  public active: boolean;

  @Input()
  public isDark = false;

  private _toggleable: boolean;

  @Input()
  // tslint:disable-next-line:no-any
  get toggleable(): boolean | any {
    return this._toggleable;
  }

  // tslint:disable-next-line:no-any
  set toggleable(value: any) {
    this._toggleable = coerceBooleanProperty(value);
  }

  @Output()
  public outOfBoundsClicked = new EventEmitter();

  @HostListener('document:mousedown', ['$event'])
  private outsideClick(event: MouseEvent): void {
    // @ts-ignore
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.outOfBoundsClicked.emit();
    }
  }

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {

  }

}
