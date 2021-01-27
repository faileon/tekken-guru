import {Component, Input, OnInit} from '@angular/core';
import {MoveService} from '../../../services/move.service';
import {CombosService} from '../../../services/combos.service';

@Component({
  selector: 'tg-named-router',
  templateUrl: './named-router.component.html',
  styleUrls: ['./named-router.component.scss'],
  providers: [MoveService, CombosService]
})
export class NamedRouterComponent implements OnInit {

  @Input()
  public isFirstTab!: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
