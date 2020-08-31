import {Property} from './property.type';

export type Move = {
  _id: string;
  name: string;
  notation: string;
  hit: {
    damage: number[];
    move: string[];
    onBlock?: string;
    onCounterHit?: string;
    onHit?: string;
  };
  frames: {
    onBlock: number;
    onCounterHit: number;
    onHit: number;
    startUp: number;
  }
  properties?: Property[];
};
