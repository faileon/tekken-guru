import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IconProp, SizeProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'tg-navigation-back',
  templateUrl: './navigation-back.component.html',
  styleUrls: ['./navigation-back.component.scss']
})
export class NavigationBackComponent implements OnInit {

  @Input()
  public icon: IconProp = 'chevron-left';

  @Input()
  public iconSize: SizeProp = '2x';

  public isVisible$: Observable<boolean>;
  public backLink: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.isVisible$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => activatedRoute.snapshot.firstChild.children?.length > 0),
      tap(event => {
        this.backLink = this.activatedRoute.firstChild.snapshot.url[0].path
      })
    );
  }

  ngOnInit(): void {
  }
}

