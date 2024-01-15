import { Injectable } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { AVAILABLE_GAMES } from '../config/navigation.config';
import { Game } from '../types/ui.types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private _selectedGame = new BehaviorSubject<Game | null>(null);

  public selectedGame$ = this._selectedGame.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((e) => e instanceof ActivationEnd),
        map((e) => (e as ActivationEnd).snapshot.queryParams),
        map((queryParams) => {
          const urlParams = new URLSearchParams(window.location.search);
          return queryParams['game'] ?? urlParams.get('game');
        }),
        distinctUntilChanged(),
        map(
          (game) =>
            AVAILABLE_GAMES.find(
              (availableGame) => availableGame.value === game,
            ) ?? AVAILABLE_GAMES[AVAILABLE_GAMES.length - 1],
        ),
      )
      .subscribe((selectedRouterGame) => {
        console.log('selected router game', selectedRouterGame);
        this._selectedGame.next(selectedRouterGame);
      });
  }

  public selectGame(game: string) {
    const urlTree = this.router.createUrlTree([], {
      queryParams: {
        game,
      },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });

    this.router.navigateByUrl(urlTree);
  }
}
