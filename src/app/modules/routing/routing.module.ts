import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardScreenComponent} from '../../screens/dashboard/dashboard-screen.component';
import {CharacterSelectScreenComponent} from '../../screens/character/select/character-select-screen.component';
import {CharacterDetailScreenComponentComponent} from '../../screens/character/detail/character-detail-screen-component.component';
import {CharacterMovelistScreenComponent} from '../../screens/character/detail/subscreens/movelist-screen/character-movelist-screen.component';
import {CharacterCombosScreenComponent} from '../../screens/character/detail/subscreens/character-combos-screen/character-combos-screen.component';

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
    component: CharacterDetailScreenComponentComponent,
    children: [
      {
        path: 'movelist',
        component: CharacterMovelistScreenComponent
      },
      {
        path: 'combos',
        component: CharacterCombosScreenComponent,
      },
      {
        path: '**',
        redirectTo: 'movelist'
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
