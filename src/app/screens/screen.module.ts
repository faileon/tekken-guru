import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterSelectScreenComponent} from './character/detail/select/character-select-screen.component';
import {DashboardScreenComponent} from './dashboard/dashboard-screen.component';
import {CharacterDetailScreenComponent} from './character/detail/character-detail-screen.component';
import {CharacterCombosScreenComponent} from './character/detail/subscreens/character-combos-screen/character-combos-screen.component';
import {CharacterKeyMovesScreenComponent} from './character/detail/subscreens/key-moves-screen/character-key-moves-screen.component';
import {CharacterPunishesScreenComponent} from './character/detail/subscreens/punishes-screen/character-punishes-screen.component';
import {CharacterOverviewScreenComponent} from './character/detail/subscreens/overview-screen/character-overview-screen.component';
import {ComponentModule} from '../components/component.module';
import {DirectiveModule} from '../directives/directive.module';
import {RoutingModule} from '../modules/routing/routing.module';
import {MatchupScreenComponent} from './character/matchup/matchup-screen.component';
import {MatchupSelectComponent} from './character/matchup/select/matchup-select.component';
import {MovelistScreenComponent} from './character/movelist-screen/movelist-screen.component';

@NgModule({
  declarations: [
    CharacterSelectScreenComponent,
    DashboardScreenComponent,
    CharacterDetailScreenComponent,
    CharacterCombosScreenComponent,
    CharacterKeyMovesScreenComponent,
    CharacterPunishesScreenComponent,
    CharacterOverviewScreenComponent,
    MatchupScreenComponent,
    MovelistScreenComponent,
    MatchupSelectComponent
  ],
  imports: [
    CommonModule,
    ComponentModule,
    DirectiveModule,
    RoutingModule,
  ],
  exports: [
    CharacterSelectScreenComponent,
    DashboardScreenComponent,
    CharacterDetailScreenComponent,
    CharacterCombosScreenComponent,
    CharacterKeyMovesScreenComponent,
    CharacterPunishesScreenComponent,
    CharacterOverviewScreenComponent,
    MovelistScreenComponent,
  ]
})
export class ScreenModule {
}
