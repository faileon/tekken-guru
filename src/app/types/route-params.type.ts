import {Params} from '@angular/router';

export interface CharacterParams extends Params {
  _id: string;
  activeTab: string;
}
