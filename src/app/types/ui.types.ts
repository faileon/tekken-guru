import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {RouterOutlet} from '@angular/router';


export interface TGMenuItem {

  // tslint:disable-next-line:no-any
  routeTo?: string | any[];
  title: string;
  icon?: IconDefinition;
}


