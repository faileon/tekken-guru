import {Params} from '@angular/router';

export interface CharacterParams extends Params {
  _id: string;
}

export interface MatchupParams extends Params {
  firstId: string;
  secondId: string;
}
