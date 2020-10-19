import {CharacterSubscreenSettings} from '../types';
import {Data, Params} from '@angular/router';

export const getCharacterIdFromRoute = (data: Data, params: Params): string => {
  const {index} = data as CharacterSubscreenSettings;
  return Object.values(params)[index];
};
