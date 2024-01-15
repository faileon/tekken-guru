import { Game, TGMenuItem } from '../types/ui.types';
import {
  faTh,
  faUsers,
  faInfinity,
  faCog,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons';

// MAIN MENU
export const APP_MENU: TGMenuItem[] = [
  {
    title: 'Dashboard',
    icon: faTh,
    routeTo: '/dashboard',
    ariaLabel: 'Dashboard',
  },
  {
    title: 'Characters',
    icon: faUsers,
    routeTo: '/characters',
    ariaLabel: 'List of characters',
  },
  {
    title: 'Matchup',
    icon: faInfinity,
    routeTo: '/matchup',
    ariaLabel: 'Matchup select',
  },
  {
    title: 'Practice',
    icon: faDumbbell,
    routeTo: '/practice',
    ariaLabel: 'Practice mode',
  },
  {
    title: 'Settings',
    icon: faCog,
    routeTo: '/settings',
    ariaLabel: 'Settings',
  },
];
// CHARACTER DETAIL TABS
export const DEFAULT_CHARACTER_TABS: TGMenuItem[] = [
  {
    title: 'Moves',
    routeTo: 'movelist',
    ariaLabel: 'Character movelist',
  },
  {
    title: 'Key moves',
    routeTo: 'keymoves',
    ariaLabel: 'Character keymoves',
  },
  {
    title: 'Combos',
    routeTo: 'combos',
    ariaLabel: 'Character keymoves',
  },
  {
    title: 'Punishes',
    routeTo: 'punishes',
    ariaLabel: 'Character keymoves',
  },
  {
    title: 'Overview',
    routeTo: 'overview',
    ariaLabel: 'Character keymoves',
  },
];

export const AVAILABLE_GAMES: Game[] = [
  {
    value: 'tekken7',
    label: 'Tekken 7',
  },
  {
    value: 'tekken8',
    label: 'Tekken 8',
  },
];

// helper function for character matchup tabs
const createCharacterMatchupTabs = (outletName: string): TGMenuItem[] => {
  // todo replace static paths with object generated from DEFAULT_CHAR_TABS
  const pathz = DEFAULT_CHARACTER_TABS.reduce(
    (acc, curr) => {
      acc[curr.routeTo as string] = curr.title;
      return acc;
    },
    {} as Record<string, unknown>,
  );

  const paths = {
    movelist: 'Moves',
    keymoves: 'Key moves',
    combos: 'Combos',
    punishes: 'Punishes',
    overview: 'Overview',
  };

  return Object.entries(paths).map(([route, title]) => ({
    title,
    routeTo: [{ outlets: { [outletName]: [`${route}`] } }],
  }));
};

// CHARACTER MATCHUP TABS
export const MATCHUP_CHARACTER_1_TABS: TGMenuItem[] =
  createCharacterMatchupTabs('tab1');
export const MATCHUP_CHARACTER_2_TABS: TGMenuItem[] =
  createCharacterMatchupTabs('tab2');
