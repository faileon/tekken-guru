import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tg-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input()
  public id: string;

  @Input()
  public name: string;

  @Input()
  public options: { label: string; value: string }[];

  @Input()
  public defaultValue?: string;

  @Output()
  public optionChanged = new EventEmitter<string>();

  ngOnInit(): void {}

  onOptionChanged(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.optionChanged.next(value);
  }
}
