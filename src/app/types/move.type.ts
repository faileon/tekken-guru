import {HitProperty, MoveProperty} from './property.type';
import {Punishment} from './punishment.type';

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
  properties?: MoveProperty[];
  isKeyMove?: boolean;
  punishment?: Punishment,
  video: string;
};

