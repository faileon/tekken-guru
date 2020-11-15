import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

import {TGMenuItem} from './types/ui.types';
import {APP_MENU} from './config/navigation.config';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

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

  @ViewChild('mobileNav')
  private mobileNav!: ElementRef;

  @HostListener('document:mousedown', ['$event'])
  public outsideClick(event: MouseEvent): void {
    if (!this.mobileNav?.nativeElement.contains(event.target)) {
      this.isMobileSidebarOpen = false;
    }
  }

  constructor(/*private firestore: AngularFirestore*/ ) {
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
