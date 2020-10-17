import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Character, MatchupParams} from '../../../types';
import {CharacterService} from '../../../services/character.service';
import {interval, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TGMenuItem} from '../../../types/ui.types';
import {MATCHUP_CHARACTER_1_TABS, MATCHUP_CHARACTER_2_TABS} from '../../../config/navigation.config';


@Component({
  selector: 'tg-matchup-screen',
  templateUrl: './matchup-screen.component.html',
  styleUrls: ['./matchup-screen.component.scss'],
})
export class MatchupScreenComponent implements OnInit {
  public firstCharacterTabs: TGMenuItem[] = MATCHUP_CHARACTER_1_TABS;
  public firstCharacter$: Observable<Character>;

  public secondCharacter$: Observable<Character>;
  public secondCharacterTabs: TGMenuItem[] = MATCHUP_CHARACTER_2_TABS;

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
