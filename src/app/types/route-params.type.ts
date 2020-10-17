import {Params} from '@angular/router';

export interface CharacterParams extends Params {
  _id: string;
}

export interface MatchupParams extends Params {
  firstId: string;
  secondId: string;
}

export interface MovelistScreenSettings {
  index: number; // which character from route params to fetch
}
