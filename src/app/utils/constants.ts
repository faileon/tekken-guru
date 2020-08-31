import {TGTab} from '../types/ui.types';

export const DEFAULT_CHARACTER_TABS: TGTab[] = [
  {
    title: 'Moves',
    routeTo: 'movelist',
    active: false,
  },
  {
    title: 'Key moves',
    routeTo: 'keymoves',
    active: false,
  },
  {
    title: 'Combos',
    routeTo: 'combos',
    active: false,
  },
  {
    title: 'Punishes',
    routeTo: 'punishes',
    active: false,
  }, {
    title: 'Overview',
    routeTo: 'overview',
    active: false,
  }
];
