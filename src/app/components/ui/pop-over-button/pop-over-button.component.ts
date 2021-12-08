import {
  AfterViewInit,
  Component,
  ElementRef,
  EmbeddedViewRef, HostBinding,
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
import {take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'tg-pop-over-button',
  templateUrl: './pop-over-button.component.html',
  styleUrls: ['./pop-over-button.component.scss']
})
export class PopOverButtonComponent implements AfterViewInit, OnDestroy {
  private isDestroyed$ = new Subject<boolean>();

  @Input()
  public icon!: IconProp;

  @Input()
  public title?: string;

  @Input()
  public withHeader = true;

  @ViewChild('content')
  private content: TemplateRef<unknown>;

  public overlayRef: OverlayRef;
  private portal: TemplatePortal;

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private _viewContainerRef: ViewContainerRef,
    private _elementRef: ElementRef) {
  }

  private createOverlayRef(): void {
    const positions = [
      new ConnectionPositionPair({originX: 'start', originY: 'bottom'}, {overlayX: 'start', overlayY: 'top'}),
      new ConnectionPositionPair({originX: 'start', originY: 'top'}, {overlayX: 'start', overlayY: 'bottom'})
    ];

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this._elementRef)
      .withPositions(positions);

    // create overlay
    this.overlayRef = this.overlay.create({positionStrategy});

    // subscribe to outside click
    this.overlayRef.outsidePointerEvents()
      .pipe(
        takeUntil(this.isDestroyed$)
      )
      .subscribe(_ => {
        this.overlayRef?.detach();
      });
  }

  ngOnDestroy(): void {
    this.overlayRef?.detach();
    this.overlayRef?.dispose();

    this.isDestroyed$.next(true);
    this.isDestroyed$.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.portal = new TemplatePortal(this.content, this._viewContainerRef);
  }

  public openContent(): void {
    if (!this.overlayRef) {
      this.createOverlayRef();
    }

    if (!this.overlayRef?.hasAttached()) {
      this.overlayRef?.attach(this.portal);
    } else {
      this.overlayRef?.detach();
    }
  }

}
