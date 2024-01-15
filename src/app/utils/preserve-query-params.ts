import {
  PathLocationStrategy,
  APP_BASE_HREF,
  PlatformLocation,
  HashLocationStrategy,
} from '@angular/common';
import { Optional, Inject, Injectable } from '@angular/core';
import { UrlSerializer, UrlTree } from '@angular/router';

@Injectable()
export class PathPreserveQueryLocationStrategy extends PathLocationStrategy {
  private get search(): string {
    return this.platformLocation?.search ?? '';
  }
  constructor(
    private platformLocation: PlatformLocation,
    private urlSerializer: UrlSerializer,
    @Optional() @Inject(APP_BASE_HREF) _baseHref?: string,
  ) {
    super(platformLocation, _baseHref);
  }

  prepareExternalUrl(internal: string): string {
    const path = super.prepareExternalUrl(internal);
    const existingURLSearchParams = new URLSearchParams(this.search);

    const existingQueryParams = Object.fromEntries(
      existingURLSearchParams.entries(),
    );
    const urlTree = this.urlSerializer.parse(path);
    const nextQueryParams = urlTree.queryParams;

    urlTree.queryParams = { ...existingQueryParams, ...nextQueryParams };

    return urlTree.toString();
  }
}
