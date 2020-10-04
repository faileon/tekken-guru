import {TGMenuItem} from '../types/ui.types';
import {faTh, faUsers, faInfinity} from '@fortawesome/free-solid-svg-icons';

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
  // todo just test, move this
  {
    title: 'Matchup',
    icon: faInfinity,
    routeTo: '/matchup'
  }
/*  {
    title: 'Matchup Detail',
    icon: faInfinity,
    routeTo: ['/matchup/leroy/king', {
      outlets: {
        tab1: ['movelist'],
        tab2: ['movelist']
      }
    }]
  }*/
];

// matchup routes idea:
// /matchup/leroy/paul with outletParams?:
