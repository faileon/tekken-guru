import { Component, OnInit } from '@angular/core';
import {Character} from '../../types';

@Component({
  selector: 'tg-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.scss']
})
export class CharacterSelectComponent implements OnInit {

  // todo position from bottom left corner
  public readonly characters = [
    {name: 'Miguel'},
    {name: 'Bob'},
    {name: 'Bryan'},
    {name: 'King'},
    {name: 'Steve'},
    {name: 'Paul'},
    {name: 'Josie'},
    {name: 'Katarina'},
    {name: 'Jin'},
    {name: 'Devil Jin'},
    {name: 'Claudio'},
    {name: 'Gigas'},
    {name: 'Asuka'},
    {name: 'Alisa'},
    {name: 'Leo'},
    {name: 'Feng'},
    {name: 'Eddy'},
    {name: 'Panda'},
    {name: 'Master Raven'},
    {name: 'Nina'},
    {name: 'Yoshimitsu'},
    {name: 'Dragunov'},
    {name: 'Hwoarang'},
    {name: 'Law'},
    {name: 'Shaheen'},
    {name: 'Akuma'},
    {name: 'Kazuya'},
    {name: 'Heihachi'},
    {name: 'Kazumi'},
    {name: 'Lucky Chloe'},
    {name: 'Lili'},
    {name: 'Lars'},
    {name: 'Xiaou'},
    {name: 'Jack-7'},
    {name: 'Lee'},
    {name: 'Bear'},
    {name: 'Ganryu'},
    {name: 'Zafina'},
    {name: 'Julia'},
    {name: 'Marduk'},
    {name: 'Anna'},
    {name: 'Geese'},
    {name: 'Eliza'},
    {name: 'Noctis'},
    {name: 'Lei'},
    {name: 'Armor King'},
    {name: 'Negan'},
    {name: 'Leroy'},
    {name: 'Fahkumran'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public onCharacterSelected(character: Character): void {
    console.log('selected', character);
  }
}
