import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {faUsers, faTh} from '@fortawesome/free-solid-svg-icons';

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
  public readonly menuItems = [
    {
      text: 'Dashboard',
      icon: faTh,
      to: '/dashboard'
    },
    {
      text: 'Characters',
      icon: faUsers,
      to: '/characters'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
