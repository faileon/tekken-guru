import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardScreenComponent} from '../../screens/dashboard/dashboard-screen.component';
import {CharacterSelectScreenComponent} from '../../screens/character/detail/select/character-select-screen.component';
import {CharacterDetailScreenComponent} from '../../screens/character/detail/character-detail-screen.component';

import {CharacterCombosScreenComponent} from '../../screens/character/detail/subscreens/character-combos-screen/character-combos-screen.component';
import {CharacterKeyMovesScreenComponent} from '../../screens/character/detail/subscreens/key-moves-screen/character-key-moves-screen.component';
import {CharacterPunishesScreenComponent} from '../../screens/character/detail/subscreens/punishes-screen/character-punishes-screen.component';
import {CharacterOverviewScreenComponent} from '../../screens/character/detail/subscreens/overview-screen/character-overview-screen.component';
import {MatchupScreenComponent} from '../../screens/character/matchup/matchup-screen.component';
import {MatchupSelectComponent} from '../../screens/character/matchup/select/matchup-select.component';
import {MovelistScreenComponent} from '../../screens/character/movelist-screen/movelist-screen.component';
import {MovelistScreenSettings} from '../../types';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/characters',
    pathMatch: 'full'
  },
  {
    path: 'characters',
    component: CharacterSelectScreenComponent,
  },
  {
    path: 'characters/:_id',
    component: CharacterDetailScreenComponent,
    children: [
      {
        path: 'movelist',
        component: MovelistScreenComponent,
        data: {
          index: 0,
        } as MovelistScreenSettings
      },
      {
        path: 'keymoves',
        component: CharacterKeyMovesScreenComponent,
      },
      {
        path: 'combos',
        component: CharacterCombosScreenComponent,
      },
      {
        path: 'punishes',
        component: CharacterPunishesScreenComponent,
      },
      {
        path: 'overview',
        component: CharacterOverviewScreenComponent,
      },
      {
        path: '**',
        redirectTo: 'movelist'
      }
    ]
  },
  {
    path: 'matchup',
    component: MatchupSelectComponent
  },
  {
    path: 'matchup/:firstId/:secondId',
    pathMatch: 'full',
    redirectTo: '/matchup/:firstId/:secondId/(tab1:movelist//tab2:movelist)'
  },
  {
    path: 'matchup/:firstId/:secondId',
    component: MatchupScreenComponent,
    children: [
      {
        path: 'movelist',
        component: MovelistScreenComponent,
        outlet: 'tab1',
        data: {
          index: 0,
        } as MovelistScreenSettings
      },
      {
        path: 'keymoves',
        component: CharacterKeyMovesScreenComponent,
        outlet: 'tab1',
        data: {
          index: 0,
        } as MovelistScreenSettings
      },
      {
        path: 'combos',
        component: CharacterCombosScreenComponent,
        outlet: 'tab1',
        data: {
          index: 0,
        } as MovelistScreenSettings
      },
      {
        path: 'punishes',
        component: CharacterPunishesScreenComponent,
        outlet: 'tab1',
        data: {
          index: 0,
        } as MovelistScreenSettings
      },
      {
        path: 'overview',
        component: CharacterOverviewScreenComponent,
        outlet: 'tab1',
        data: {
          index: 0,
        } as MovelistScreenSettings
      },
      {
        path: 'movelist',
        component: MovelistScreenComponent,
        outlet: 'tab2',
        data: {
          index: 1,
        } as MovelistScreenSettings
      },
      {
        path: 'keymoves',
        component: CharacterKeyMovesScreenComponent,
        outlet: 'tab2',
        data: {
          index: 1,
        } as MovelistScreenSettings
      },
      {
        path: 'combos',
        component: CharacterCombosScreenComponent,
        outlet: 'tab2',
        data: {
          index: 1,
        } as MovelistScreenSettings
      },
      {
        path: 'punishes',
        component: CharacterPunishesScreenComponent,
        outlet: 'tab2',
        data: {
          index: 1,
        } as MovelistScreenSettings
      },
      {
        path: 'overview',
        component: CharacterOverviewScreenComponent,
        outlet: 'tab2',
        data: {
          index: 1,
        } as MovelistScreenSettings
      },
    ]
  },
  {
    path: 'dashboard',
    component: DashboardScreenComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule {
}
