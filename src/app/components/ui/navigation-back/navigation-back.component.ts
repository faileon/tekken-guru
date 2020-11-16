import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../../services/breadcrumb.service';

@Component({
  selector: 'tg-navigation-back',
  templateUrl: './navigation-back.component.html',
  styleUrls: ['./navigation-back.component.scss']
})
export class NavigationBackComponent implements OnInit {
  constructor(
    public breadcrumbService: BreadcrumbService) {
  }

  ngOnInit(): void {
  }
}

