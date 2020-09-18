import {Property} from './property.type';

export type Move = {
  _id: string;
  name: string;
  notation: string;
  hit: {
    damage: number[];
    move: string[];
    onBlock?: HitProperty;
    onCounterHit?: HitProperty;
    onHit?: HitProperty;
  };
  frames: {
    onBlock?: number;
    onCounterHit?: number;
    onHit?: number;
    startUp: number;
  }
  properties?: Property[];
  isKeyMove?: boolean;
  video: string;
};

export type HitProperty = 'KND' | 'LAUNCH';
