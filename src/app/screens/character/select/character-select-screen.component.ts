import {Component, OnInit} from '@angular/core';
import {Character} from '../../../types';
import {CharacterService} from '../../../services/character.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'tg-character-select',
  templateUrl: './character-select-screen.component.html',
  styleUrls: ['./character-select-screen.component.scss']
})
export class CharacterSelectScreenComponent implements OnInit {

  constructor(public characterService: CharacterService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public onCharacterSelected(character: Character): void {
    // console.log('selected', character);
    this.router.navigateByUrl(`characters/${character._id}/movelist`); // todo rework via routerlink

  }
}
