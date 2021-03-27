import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {map, take} from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ContentOrder} from '../../types';


@Component({
  selector: 'tg-settings-screen',
  templateUrl: './settings-screen.component.html',
  styleUrls: ['./settings-screen.component.scss']
})
export class SettingsScreenComponent implements OnInit {

  public contentOrder: string[];

  constructor(public settingsService: SettingsService) {
    this.settingsService.contentOrder$.pipe(
      take(1),
      map(contentOrder => Object.entries(contentOrder).sort(([_, a], [__, b]) => a - b).map(([key]) => key))
    ).subscribe(res => {
      this.contentOrder = res;
    });
  }

  ngOnInit(): void {
  }

  public onContentOrderChanged(event: CdkDragDrop<string[]>): void {
    const {previousIndex, currentIndex} = event;
    moveItemInArray(this.contentOrder, previousIndex, currentIndex);
    const newOrder = this.contentOrder.reduce((acc, curr, index) => {
      acc[curr] = index;
      return acc;
    }, {} as Record<string, number>);

    this.settingsService.contentOrder = newOrder as ContentOrder;
  }
}

