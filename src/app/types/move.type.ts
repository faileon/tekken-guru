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
    recovery?: {
      frames: number[];
    };
    active?: {
      frames: number[];
    };
  };
  hit: {
    damage: number[];
    chipDamage?: number[];
    move: HitLevel[];
  };
  reach?: number[];
  properties?: MoveProperty[];
  isKeyMove?: boolean;
  punishment?: Punishment;
  video: string;
  tags?: string[];
  notes?: string;
  weakSide?: WeakSide[];
};
export type WeakSide = 'SSR' | 'SSL' | 'SWR' | 'SWL' | 'SS' | 'SW';

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
