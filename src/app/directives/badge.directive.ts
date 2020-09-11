import {Directive, ElementRef, HostBinding, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

/**
 * Heavily inspired by matBadge, simplified for my use case.
 */
@Directive({
  selector: '[tgBadge]',
})
export class BadgeDirective implements OnChanges {
  private _badgeElement: HTMLElement | undefined;

  @HostBinding('style.position')
  private position = 'relative';

  @Input('tgBadge')
  public content: string | number;

  @Input('tgBadgeHidden')
  get hidden(): boolean {
    return this._hidden;
  }

  set hidden(val: boolean) {
    this._hidden = coerceBooleanProperty(val);
  }

  private _hidden: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const contentChange = changes.content;

    if (contentChange) {
      const value = `${contentChange.currentValue}`;
      this._updateTextContent(value);
      this._setClasses();
    }
  }

  private _setClasses(): void {
    this._badgeElement.classList.add('tg-badge');
    if (this.hidden) {
      this._badgeElement.classList.add('hidden');
    } else {
      this._badgeElement.classList.remove('hidden');
    }
  }

  private _createBadgeElement(): HTMLElement {
    const badge: HTMLElement = this.renderer.createElement('span');
    badge.innerText = `${this.content}`;
    this.renderer.appendChild(this.elementRef.nativeElement, badge);
    return badge;
  }

  private _updateTextContent(value: string): HTMLSpanElement {
    if (!this._badgeElement) {
      this._badgeElement = this._createBadgeElement();
    } else {
      this._badgeElement.textContent = value;
    }
    return this._badgeElement;
  }

}
