import {
  AfterViewInit,
  Component,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Input, OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {ConnectionPositionPair, Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';

@Component({
  selector: 'tg-pop-over-button',
  templateUrl: './pop-over-button.component.html',
  styleUrls: ['./pop-over-button.component.scss']
})
export class PopOverButtonComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public icon!: IconProp;

  @Input()
  public title?: string;

  @Input()
  public withHeader = true;

  @ViewChild('content')
  private content: TemplateRef<unknown>;

  private overlayRef: OverlayRef;
  private portal: TemplatePortal;

  @HostListener('document:mousedown', ['$event'])
  private outsideClick(event: MouseEvent): void {
    // @ts-ignore
    if (!this.overlayRef.hostElement.contains(event.target)) {
      this.closeContent();
    }
  }

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private _viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const positions = [
      new ConnectionPositionPair({originX: 'start', originY: 'bottom'}, {overlayX: 'start', overlayY: 'top'}),
      new ConnectionPositionPair({originX: 'start', originY: 'top'}, {overlayX: 'start', overlayY: 'bottom'})
    ];

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions);

    this.overlayRef = this.overlay.create({positionStrategy});
  }

  ngOnDestroy(): void {
    this.closeContent();
  }

  ngAfterViewInit(): void {
    this.portal = new TemplatePortal(this.content, this._viewContainerRef);
  }

  public openContent(): void {
    if (!this.overlayRef?.hasAttached()) {
      this.overlayRef?.attach(this.portal);
    }
  }

  public closeContent(): void {
    this.overlayRef?.detach();
  }

}
