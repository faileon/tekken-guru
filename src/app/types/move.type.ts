import { HitLevel, HitProperty, MoveProperty } from './property.type';
import { Punishment } from './punishment.type';

export type Move = {
  _id: string;
  name: string;
  notation: string;
  frameData: {
    startUp: {
      frames: number | number[]; // in t7 i only tracked number, from now on i keep it as number[]
    };
    onBlock: {
      frames?: number[];
      property?: HitProperty[];
    };
    onHit: {
      frames?: number[];
      property?: HitProperty[];
    };
    onCounterHit: {
      frames?: number[];
      property?: HitProperty[];
    };
  };
  hit: {
    damage: number[];
    move: HitLevel[];
  };
  properties?: MoveProperty[];
  isKeyMove?: boolean;
  punishment?: Punishment;
  video: string;
  tags?: string[];
  notes?: string;
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
  };
  properties?: MoveProperty[];
  isKeyMove?: boolean;
  punishment?: Punishment;
  video: string;
};
