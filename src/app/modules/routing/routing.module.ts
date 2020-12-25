import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardScreenComponent} from '../../screens/dashboard/dashboard-screen.component';
import {CharacterSelectScreenComponent} from '../../screens/character/detail/select/character-select-screen.component';
import {CharacterDetailScreenComponent} from '../../screens/character/detail/character-detail-screen.component';
import {CombosScreenComponent} from '../../screens/character/subscreens/combos-screen/combos-screen.component';
import {KeyMovesScreenComponent} from '../../screens/character/subscreens/key-moves-screen/key-moves-screen.component';
import {CharacterPunishesScreenComponent} from '../../screens/character/subscreens/punishes-screen/character-punishes-screen.component';
import {CharacterOverviewScreenComponent} from '../../screens/character/subscreens/overview-screen/character-overview-screen.component';
import {MatchupScreenComponent} from '../../screens/character/matchup/matchup-screen.component';
import {MatchupSelectComponent} from '../../screens/character/matchup/select/matchup-select.component';
import {MovelistScreenComponent} from '../../screens/character/subscreens/movelist-screen/movelist-screen.component';
import {CharacterSubscreenSettings} from '../../types';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/characters',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardScreenComponent
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
        } as CharacterSubscreenSettings
      },
      {
        path: 'keymoves',
        component: KeyMovesScreenComponent,
        data: {
          index: 0,
        } as CharacterSubscreenSettings
      },
      {
        path: 'combos',
        component: CombosScreenComponent,
        data: {
          index: 0,
        } as CharacterSubscreenSettings
      },
      {
        path: 'punishes',
        component: CharacterPunishesScreenComponent,
        data: {
          index: 0,
        } as CharacterSubscreenSettings
      },
      {
        path: 'overview',
        component: CharacterOverviewScreenComponent,
        data: {
          index: 0,
        } as CharacterSubscreenSettings
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
        } as CharacterSubscreenSettings
      },
      {
        path: 'keymoves',
        component: KeyMovesScreenComponent,
        outlet: 'tab1',
        data: {
          index: 0,
        } as CharacterSubscreenSettings
      },
      {
        path: 'combos',
        component: CombosScreenComponent,
        outlet: 'tab1',
        data: {
          index: 0,
        } as CharacterSubscreenSettings
      },
      {
        path: 'punishes',
        component: CharacterPunishesScreenComponent,
        outlet: 'tab1',
        data: {
          index: 0,
        } as CharacterSubscreenSettings
      },
      {
        path: 'overview',
        component: CharacterOverviewScreenComponent,
        outlet: 'tab1',
        data: {
          index: 0,
        } as CharacterSubscreenSettings
      },
      {
        path: 'movelist',
        component: MovelistScreenComponent,
        outlet: 'tab2',
        data: {
          index: 1,
        } as CharacterSubscreenSettings
      },
      {
        path: 'keymoves',
        component: KeyMovesScreenComponent,
        outlet: 'tab2',
        data: {
          index: 1,
        } as CharacterSubscreenSettings
      },
      {
        path: 'combos',
        component: CombosScreenComponent,
        outlet: 'tab2',
        data: {
          index: 1,
        } as CharacterSubscreenSettings
      },
      {
        path: 'punishes',
        component: CharacterPunishesScreenComponent,
        outlet: 'tab2',
        data: {
          index: 1,
        } as CharacterSubscreenSettings
      },
      {
        path: 'overview',
        component: CharacterOverviewScreenComponent,
        outlet: 'tab2',
        data: {
          index: 1,
        } as CharacterSubscreenSettings
      },
    ]
  },
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
