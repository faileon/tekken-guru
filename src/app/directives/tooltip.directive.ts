import {Directive, ElementRef, HostListener, Injector, Input, OnInit} from '@angular/core';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {TOOLTIP_INJECTION_TOKEN, TooltipComponent} from '../components/ui/tooltip/tooltip.component';

@Directive({
  selector: '[tgTooltip]'
})
export class TooltipDirective implements OnInit {

  @Input('tgTooltip')
  public text!: string;

  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay,
              private injector: Injector,
              private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
        offsetY: -8,
      }]);

    this.overlayRef = this.overlay.create({positionStrategy});
  }

  @HostListener('mouseover')
  show(): void {
    const injector = this.createInjector(this.text);
    const portal = new ComponentPortal(TooltipComponent, null, injector);
    this.overlayRef.attach(portal);
  }

  @HostListener('mouseout')
  hide(): void {
    console.log('mouse out');
    this.overlayRef.detach();
  }

  private createInjector(text: string): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(TOOLTIP_INJECTION_TOKEN, text);
    return new PortalInjector(this.injector, injectorTokens);
  }

}
