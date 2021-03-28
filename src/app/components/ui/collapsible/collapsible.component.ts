import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tg-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss']
})
export class CollapsibleComponent implements OnInit {

  public isOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

}
