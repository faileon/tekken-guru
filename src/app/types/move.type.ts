import {HitProperty, MoveProperty} from './property.type';
import {Punishment} from './punishment.type';

export type Move = {
  _id: string;
  name: string;
  notation: string;
  frameData: {
    startUp: {
      frames: number;
    },
    onBlock: {
      frames?: number[];
      property?: HitProperty[];
    },
    onHit: {
      frames?: number[];
      property?: HitProperty[];
    },
    onCounterHit: {
      frames?: number[];
      property?: HitProperty[];
    }
  };
  hit: {
    damage: number[];
    move: string[];
  };
  properties?: MoveProperty[];
  isKeyMove?: boolean;
  punishment?: Punishment;
  video: string;
  tags?: string[];
};




export type OldMove = {
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
  frames?: {
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

