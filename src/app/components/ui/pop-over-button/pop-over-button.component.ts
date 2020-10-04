import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'tg-pop-over-button',
  templateUrl: './pop-over-button.component.html',
  styleUrls: ['./pop-over-button.component.scss']
})
export class PopOverButtonComponent implements OnInit {

  public isOpen = false;

  @Input()
  public icon!: IconProp;

  @HostListener('document:mousedown', ['$event'])
  public outsideClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }

}
