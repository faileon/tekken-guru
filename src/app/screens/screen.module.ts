import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterSelectScreenComponent} from './character/detail/select/character-select-screen.component';
import {DashboardScreenComponent} from './dashboard/dashboard-screen.component';
import {CharacterDetailScreenComponent} from './character/detail/character-detail-screen.component';
import {CombosScreenComponent} from './character/subscreens/combos-screen/combos-screen.component';
import {KeyMovesScreenComponent} from './character/subscreens/key-moves-screen/key-moves-screen.component';
import {CharacterPunishesScreenComponent} from './character/subscreens/punishes-screen/character-punishes-screen.component';
import {CharacterOverviewScreenComponent} from './character/subscreens/overview-screen/character-overview-screen.component';
import {ComponentModule} from '../components/component.module';
import {DirectiveModule} from '../directives/directive.module';
import {RoutingModule} from '../modules/routing/routing.module';
import {MatchupScreenComponent} from './character/matchup/matchup-screen.component';
import {MatchupSelectComponent} from './character/matchup/select/matchup-select.component';
import {MovelistScreenComponent} from './character/subscreens/movelist-screen/movelist-screen.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SettingsScreenComponent} from './settings-screen/settings-screen.component';
import { PracticeScreenComponent } from './practice/practice-screen/practice-screen.component';
import {PipeModule} from '../pipes/pipe.module';

@NgModule({
  declarations: [
    CharacterSelectScreenComponent,
    DashboardScreenComponent,
    CharacterDetailScreenComponent,
    CombosScreenComponent,
    KeyMovesScreenComponent,
    CharacterPunishesScreenComponent,
    CharacterOverviewScreenComponent,
    MatchupScreenComponent,
    MovelistScreenComponent,
    MatchupSelectComponent,
    SettingsScreenComponent,
    PracticeScreenComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    DirectiveModule,
    RoutingModule,
    FontAwesomeModule,
    PipeModule,
  ],
  exports: [
    CharacterSelectScreenComponent,
    DashboardScreenComponent,
    CharacterDetailScreenComponent,
    CombosScreenComponent,
    KeyMovesScreenComponent,
    CharacterPunishesScreenComponent,
    CharacterOverviewScreenComponent,
    MovelistScreenComponent,
  ]
})
export class ScreenModule {
}
