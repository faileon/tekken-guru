import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharacterService} from '../../../../services/character.service';
import {Character} from '../../../../types';
import {Observable, Subject} from 'rxjs';
import {bufferCount, filter, flatMap, mergeAll, mergeMap, pairwise, take, takeUntil, tap, windowCount} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'tg-matchup-select',
  templateUrl: './matchup-select.component.html',
  styleUrls: ['./matchup-select.component.scss']
})
export class MatchupSelectComponent implements OnInit, OnDestroy {
  private _isDestroyed$ = new Subject<boolean>();

  private _charactersSelected: Subject<Character>;
  public characterSelected$: Observable<Character>;
  public currentSelectionIdx = 1;

  constructor(public characterService: CharacterService, private router: Router, private route: ActivatedRoute) {
    this._charactersSelected = new Subject<Character>();
    this.characterSelected$ = this._charactersSelected.asObservable();
  }

  ngOnInit(): void {
    // matchup select is for two characters, lets make it happen:
    this.characterSelected$.pipe(
      takeUntil(this._isDestroyed$),
      tap(_ => this.currentSelectionIdx++),
      pairwise(),
      filter(([val1, val2]) => val1 !== null && val2 !== null)
    ).subscribe(([char1, char2]) => {
      this.router.navigate([`${char1._id}/${char2._id}`], {relativeTo: this.route});
    });
  }

  ngOnDestroy(): void {
    this._isDestroyed$.next(true);
    this._isDestroyed$.complete();
  }

  public onCharacterSelected(character: Character): void {
    this._charactersSelected.next(character);
  }

}
