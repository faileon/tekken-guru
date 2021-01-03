import {Directive, ElementRef, HostListener, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {TOOLTIP_INJECTION_TOKEN, TooltipComponent} from '../components/ui/tooltip/tooltip.component';

@Directive({
  selector: '[tgTooltip]'
})
export class TooltipDirective implements OnDestroy {

  @Input('tgTooltip')
  public text!: string;

  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay,
              private injector: Injector,
              private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef) {
  }

  ngOnDestroy(): void {
    this.overlayRef?.detach();
  }

  @HostListener('mouseenter', ['$event'])
  show(event: MouseEvent): void {
    this.overlayRef = this.createOverlayRef();
    const injector = this.createInjector(this.text);
    const portal = new ComponentPortal(TooltipComponent, null, injector);
    this.overlayRef.attach(portal);
  }

  @HostListener('mouseleave', ['$event'])
  hide(event: MouseEvent): void {
    this.overlayRef?.detach();
  }

  private createInjector(text: string): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(TOOLTIP_INJECTION_TOKEN, text);
    return new PortalInjector(this.injector, injectorTokens);
  }

  private createOverlayRef(): OverlayRef {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
      }]);

    return this.overlay.create({positionStrategy});
  }

}
