import {Move} from './move.type';

export type Character = {
  _id: string;
  fullName: string;
  position: number;
  avatar: string;
  difficulty: number;
  movelist?: Move[];
};
