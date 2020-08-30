import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardScreenComponent} from '../../screens/dashboard/dashboard-screen.component';
import {CharacterSelectScreenComponent} from '../../screens/character/select/character-select-screen.component';
import {CharacterDetailScreenComponentComponent} from '../../screens/character/detail/character-detail-screen-component.component';

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
    path: 'characters/:character/movelist',
    component: CharacterDetailScreenComponentComponent
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
