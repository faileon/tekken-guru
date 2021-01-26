import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'tg-settings-screen',
  templateUrl: './settings-screen.component.html',
  styleUrls: ['./settings-screen.component.scss']
})
export class SettingsScreenComponent implements OnInit {

  constructor(public settingsService: SettingsService) { }

  ngOnInit(): void {
  }

}
