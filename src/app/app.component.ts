import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {APP_MENU} from './utils/menu-constants';
import {TGMenuItem} from './types/ui.types';
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons';
import {AngularFirestore} from '@angular/fire/firestore';
import {Character} from './types';
import {take} from 'rxjs/operators';

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

  constructor(/*private firestore: AngularFirestore*/) {
    // todo example to get cache first
    /*this.firestore.collection<Character>('characters').get({source: 'cache'}).pipe(take(1)).subscribe(chars => {
      console.log('characters from cache:');
      chars.docs.forEach(doc => {
        console.log(doc.id, '-', doc.data());
      });
    });*/
  }

  ngOnInit(): void {
  }
}
