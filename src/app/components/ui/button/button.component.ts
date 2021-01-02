import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IconProp, SizeProp} from '@fortawesome/fontawesome-svg-core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
    selector: 'tg-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
    @Input()
    public icon?: IconProp;

    @Input()
    public iconSize: SizeProp = 'lg';

    @Input()
    public outlined = true;

    @Input()
    public active: boolean;

    private _toggleable: boolean;

    @Input()
    // tslint:disable-next-line:no-any
    get toggleable(): boolean | any {
        return this._toggleable;
    }
    // tslint:disable-next-line:no-any
    set toggleable(value: any) {
      this._toggleable = coerceBooleanProperty(value);
    }

    constructor() {
    }

    ngOnInit(): void {

    }

}
