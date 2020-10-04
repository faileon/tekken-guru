import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardScreenComponent} from '../../screens/dashboard/dashboard-screen.component';
import {CharacterSelectScreenComponent} from '../../screens/character/detail/select/character-select-screen.component';
import {CharacterDetailScreenComponent} from '../../screens/character/detail/character-detail-screen.component';

import {CharacterCombosScreenComponent} from '../../screens/character/detail/subscreens/character-combos-screen/character-combos-screen.component';
import {CharacterKeyMovesScreenComponent} from '../../screens/character/detail/subscreens/key-moves-screen/character-key-moves-screen.component';
import {CharacterPunishesScreenComponent} from '../../screens/character/detail/subscreens/punishes-screen/character-punishes-screen.component';
import {CharacterOverviewScreenComponent} from '../../screens/character/detail/subscreens/overview-screen/character-overview-screen.component';
import {MatchupComponent} from '../../screens/character/matchup/matchup.component';
import {MatchupSelectComponent} from '../../screens/character/matchup/select/matchup-select.component';
import {MatchupMovelistSettings, MovelistScreenComponent} from '../../screens/character/movelist-screen/movelist-screen.component';

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
        } as MatchupMovelistSettings
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
    component: MatchupComponent,
    children: [
      {
        path: 'movelist',
        component: MovelistScreenComponent,
        outlet: 'firstCharacter',
        data: {
          index: 0,
        } as MatchupMovelistSettings
      },
      {
        path: 'movelist',
        component: MovelistScreenComponent,
        outlet: 'secondCharacter',
        data: {
          index: 1,
        } as MatchupMovelistSettings
      }
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
