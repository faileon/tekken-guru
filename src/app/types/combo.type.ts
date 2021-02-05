import {HitProperty} from './property.type';
import {Category} from './category.type';
import {CategorizedData} from './common.types';


export type Combo = {
  _id: string;
  name: string;
  notation: string;
  category?: string; // <category;notation>, e.g. Counter Hit;b+1+2
  frameData: {
    startUp: {
      frames: number;
    },
    onBlock: {
      frames?: number[];
      property?: HitProperty[];
    };
  }
  hit: {
    damage: number[];
    move: string[];
  };
  video?: string;
  tags?: string[];
};

export type CategorizedCombo = CategorizedData<Combo[]>;
