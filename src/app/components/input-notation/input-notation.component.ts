import {Component, Input, OnInit} from '@angular/core';
import {flatten} from '../../utils/common';
import {parseNotationInput} from '../../utils/notation-parser';

@Component({
  selector: 'tg-input-notation',
  templateUrl: './input-notation.component.html',
  styleUrls: ['./input-notation.component.scss']
})
export class InputNotationComponent implements OnInit {

  @Input()
  public notation!: string;

  public parsedNotation!: string[];

  ngOnInit(): void {
    this.parsedNotation = parseNotationInput(this.notation);

  }

}


