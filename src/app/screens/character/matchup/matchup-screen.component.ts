import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Character, MatchupParams} from '../../../types';
import {CharacterService} from '../../../services/character.service';
import {fromEvent, interval, Observable} from 'rxjs';
import {map, skip, startWith, takeUntil, timeInterval} from 'rxjs/operators';

@Component({
  selector: 'tg-matchup-screen',
  templateUrl: './matchup-screen.component.html',
  styleUrls: ['./matchup-screen.component.scss'],
})
export class MatchupScreenComponent implements OnInit {
  public firstCharacter$: Observable<Character>;
  public secondCharacter$: Observable<Character>;

  public timeElapsed$!: Observable<string>;

  constructor(private route: ActivatedRoute, private characterService: CharacterService) {
    const {firstId, secondId} = route.snapshot.params as MatchupParams;
    this.firstCharacter$ = characterService.getCharacter(firstId);
    this.secondCharacter$ = characterService.getCharacter(secondId);

    this.timeElapsed$ = interval(1000).pipe(
      map(seconds => {
        // big math inc
        const m = Math.floor(seconds / 60);
        const h = Math.floor(seconds / 3600);

        const timeParts: string[] = [];
        if (h > 0) {
          timeParts.push(
            (h % 24).toString().padStart(2, '0'),
            (m % 60).toString().padStart(2, '0'),
            (seconds % 60).toString().padStart(2, '0'),
          );
        } else if (m > 0) {
          timeParts.push(
            (m % 60).toString().padStart(2, '0'),
            (seconds % 60).toString().padStart(2, '0'),
          );
        } else {
          timeParts.push(
            (seconds % 60).toString().padStart(2, '0'),
          );
        }
        return timeParts.join(':');
      })
    );
  }

  ngOnInit(): void {

  }

}
