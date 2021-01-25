import {Component, Input, OnInit} from '@angular/core';
import {parseNotation} from '../../utils/notation-parser';
import {SettingsService} from '../../services/settings.service';
import {Observable} from 'rxjs';
import {PlatformInput} from '../../types/buttons.type';

@Component({
  selector: 'tg-input-notation',
  templateUrl: './input-notation.component.html',
  styleUrls: ['./input-notation.component.scss']
})
export class InputNotationComponent implements OnInit {

  @Input()
  public notation!: string;

  public parsedNotation!: string[];

  public buttonsIcons$: Observable<PlatformInput>;


  constructor(private settingsService: SettingsService) {
    this.buttonsIcons$ = this.settingsService.platformInput$;
  }

  ngOnInit(): void {
    this.parsedNotation = parseNotation(this.notation);
  }

}


