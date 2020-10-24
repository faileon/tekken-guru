import {TGMenuItem} from '../types/ui.types';
import {faTh, faUsers, faInfinity} from '@fortawesome/free-solid-svg-icons';


// MAIN MENU
export const APP_MENU: TGMenuItem[] = [
  {
    title: 'Dashboard',
    icon: faTh,
    routeTo: '/dashboard',
    ariaLabel: 'Dashboard'
  },
  {
    title: 'Characters',
    icon: faUsers,
    routeTo: '/characters',
    ariaLabel: 'List of characters'
  },
  {
    title: 'Matchup',
    icon: faInfinity,
    routeTo: '/matchup',
    ariaLabel: 'Matchup select'
  }
];
// CHARACTER DETAIL TABS
export const DEFAULT_CHARACTER_TABS: TGMenuItem[] = [
  {
    title: 'Moves',
    routeTo: 'movelist',
    ariaLabel: 'Character movelist'
  },
  {
    title: 'Key moves',
    routeTo: 'keymoves',
    ariaLabel: 'Character keymoves'
  },
  {
    title: 'Combos',
    routeTo: 'combos',
    ariaLabel: 'Character keymoves'
  },
  {
    title: 'Punishes',
    routeTo: 'punishes',
    ariaLabel: 'Character keymoves',
  },
  {
    title: 'Overview',
    routeTo: 'overview',
    ariaLabel: 'Character keymoves'
  }
];

// helper function for character matchup tabs
const createCharacterMatchupTabs = (outletName: string): TGMenuItem[] => {
  const paths = {
    movelist: 'Moves',
    keymoves: 'Key moves',
    combos: 'Combos',
    punishes: 'Punishes',
    overview: 'Overview'
  };

  return Object.entries(paths).map(([route, title]) => ({
    title,
    routeTo: [{outlets: {[outletName]: [`${route}`]}}]
  }));
};

// CHARACTER MATCHUP TABS
export const MATCHUP_CHARACTER_1_TABS: TGMenuItem[] = createCharacterMatchupTabs('tab1');
export const MATCHUP_CHARACTER_2_TABS: TGMenuItem[] = createCharacterMatchupTabs('tab2');


