import {ThrowType} from '../types';

export const getBreakRule = (throwType: ThrowType): boolean[] => {
  switch (throwType) {
    case 'throw-1':
      return [true, false];
    case 'throw-2':
      return [false, true];
    case 'throw-1+2':
      return [true, true];
  }
};
