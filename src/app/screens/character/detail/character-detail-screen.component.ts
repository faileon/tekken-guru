import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Character, CharacterParams} from '../../../types';
import {CharacterService} from '../../../services/character.service';
import {TGMenuItem} from '../../../types/ui.types';
import {MoveService} from '../../../services/move.service';
import {Observable} from 'rxjs';
import {DEFAULT_CHARACTER_TABS} from '../../../config/navigation.config';
import {BreadcrumbService} from '../../../services/breadcrumb.service';
import {CombosService} from '../../../services/combos.service';

@Component({
  selector: 'tg-character-detail-screen-component',
  templateUrl: './character-detail-screen.component.html',
  styleUrls: ['./character-detail-screen.component.scss'],
  providers: [MoveService, CombosService]
})
export class CharacterDetailScreenComponent implements OnInit, OnDestroy {
  // private isDestroyed$: Subject<boolean> = new Subject<boolean>();
  public tabs: TGMenuItem[] = DEFAULT_CHARACTER_TABS;
  public selectedCharacter$!: Observable<Character>;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private breadcrumbService: BreadcrumbService) {

    // subscribe to route params
    const {_id} = this.route.snapshot.params as CharacterParams;
    this.selectedCharacter$ = this.characterService.getCharacter(_id);

    // set breadcrumbs
    this.breadcrumbService.breadcrumbs = [
      {
        url: 'characters',
        text: 'characters'
      },
      {
        url: `characters/${_id}`,
        text: _id
      }
    ];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('destroyed char detail');
    this.breadcrumbService.clearBreadcrumbs();
    // this.isDestroyed$.next(true);
    // this.isDestroyed$.unsubscribe();
  }

}
