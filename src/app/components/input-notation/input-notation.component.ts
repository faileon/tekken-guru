import {Component, Input, OnInit} from '@angular/core';
import {parseNotation} from '../../utils/notation-parser';

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
    this.parsedNotation = parseNotation(this.notation);
  }

}


