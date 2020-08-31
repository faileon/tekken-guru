import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {APP_MENU} from './utils/menu-constants';
import {TGMenuItem} from './types/ui.types';
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({width: 0}),
            animate('175ms ease-out', style({width: '*'}))
          ]
        ),
        transition(
          ':leave',
          [
            style({width: '*'}),
            animate('175ms ease-in', style({width: 0}))
          ]
        )
      ]
    )
  ]
})
export class AppComponent implements OnInit {
  public isMobileSidebarOpen = false;
  public readonly menuItems: TGMenuItem[] = APP_MENU;

  // todo use faLibrary - https://github.com/FortAwesome/angular-fontawesome/blob/master/docs/usage/icon-library.md
  public readonly menuIcon = faBars;
  public readonly closeIcon = faTimes;

  constructor() {
  }

  ngOnInit(): void {
  }
}
