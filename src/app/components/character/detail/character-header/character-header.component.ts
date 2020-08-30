import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../../../../types';

@Component({
  selector: 'tg-character-header',
  templateUrl: './character-header.component.html',
  styleUrls: ['./character-header.component.scss']
})
export class CharacterHeaderComponent implements OnInit {

  @Input()
  public character?: Character | null; // todo fix the null?

  constructor() {
  }

  ngOnInit(): void {
  }

}
