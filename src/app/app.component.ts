import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { TGMenuItem } from './types/ui.types';
import { APP_MENU, AVAILABLE_GAMES } from './config/navigation.config';
import packageInfo from '../../package.json';
import { GameService } from './services/game.service';

@Component({
  selector: 'tg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ width: 0 }),
        animate('175ms ease-out', style({ width: '*' })),
      ]),
      transition(':leave', [
        style({ width: '*' }),
        animate('175ms ease-in', style({ width: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  public isMobileSidebarOpen = false;
  public readonly menuItems: TGMenuItem[] = APP_MENU;
  public readonly availableGames = AVAILABLE_GAMES;
  public defaultGame$ = this.gameService.selectedGame$;

  @ViewChild('mobileNav')
  private mobileNav!: ElementRef;

  public appVersion: string = packageInfo.version;

  @HostListener('document:mousedown', ['$event'])
  public outsideClick(event: MouseEvent): void {
    if (!this.mobileNav?.nativeElement.contains(event.target)) {
      this.isMobileSidebarOpen = false;
    }
  }

  constructor(
    /*private firestore: AngularFirestore*/ private gameService: GameService,
  ) {}

  ngOnInit(): void {}

  onGameChanged(selectedGame: string) {
    this.gameService.selectGame(selectedGame);
  }
}
