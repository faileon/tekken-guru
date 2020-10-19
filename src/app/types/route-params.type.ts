import {Params} from '@angular/router';

export interface CharacterParams extends Params {
  _id: string;
}

export interface MatchupParams extends Params {
  firstId: string;
  secondId: string;
}

export interface CharacterSubscreenSettings {
  index: number; // which character (object key) from route params to fetch
}
