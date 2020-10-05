import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Character, MatchupParams} from '../../../types';
import {CharacterService} from '../../../services/character.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'tg-matchup-screen',
  templateUrl: './matchup-screen.component.html',
  styleUrls: ['./matchup-screen.component.scss'],
})
export class MatchupScreenComponent implements OnInit {
  public firstCharacter$: Observable<Character>;
  public secondCharacter$: Observable<Character>;

  constructor(private route: ActivatedRoute, private characterService: CharacterService) {
    const {firstId, secondId} = route.snapshot.params as MatchupParams;
    this.firstCharacter$ = characterService.getCharacter(firstId);
    this.secondCharacter$ = characterService.getCharacter(secondId);
  }

  ngOnInit(): void {
  }

}
