import {CharacterSubscreenSettings} from '../types';
import {ActivatedRoute, Data, Params} from '@angular/router';

export const getCharacterIdFromRoute = (data: Data, params: Params): string => {
  const {index} = data as CharacterSubscreenSettings;
  return Object.values(params)[index];
};

export const getRouteDataAndParams = (route: ActivatedRoute): { data: Data, params: Params } => {
  const {data} = route.snapshot;
  const {params} = route.parent.snapshot;
  return {data, params};
};
