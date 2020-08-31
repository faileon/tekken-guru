import {TGMenuItem} from '../types/ui.types';
import {faTh, faUsers} from '@fortawesome/free-solid-svg-icons';

export const DEFAULT_CHARACTER_TABS: TGMenuItem[] = [
  {
    title: 'Moves',
    routeTo: 'movelist',
  },
  {
    title: 'Key moves',
    routeTo: 'keymoves',
  },
  {
    title: 'Combos',
    routeTo: 'combos',
  },
  {
    title: 'Punishes',
    routeTo: 'punishes',
  }, {
    title: 'Overview',
    routeTo: 'overview',
  }
];

export const APP_MENU: TGMenuItem[] = [
  {
    title: 'Dashboard',
    icon: faTh,
    routeTo: '/dashboard'
  },
  {
    title: 'Characters',
    icon: faUsers,
    routeTo: '/characters'
  },
];
