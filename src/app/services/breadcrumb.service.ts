import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Breadcrumb} from '../types/ui.types';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private _breadcrumbs = new Subject<Breadcrumb[]>();
  public breadcrumbs$ = this._breadcrumbs.asObservable();


  set breadcrumbs(crumbs: Breadcrumb[]) {
    this._breadcrumbs.next(crumbs);
  }

  constructor() {
  }

  public clearBreadcrumbs() {
    this.breadcrumbs = [];
  }
}
