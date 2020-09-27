import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharacterSelectScreenComponent} from './character/select/character-select-screen.component';
import {DashboardScreenComponent} from './dashboard/dashboard-screen.component';
import {CharacterDetailScreenComponentComponent} from './character/detail/character-detail-screen-component.component';
import {CharacterMovelistScreenComponent} from './character/detail/subscreens/movelist-screen/character-movelist-screen.component';
import {CharacterCombosScreenComponent} from './character/detail/subscreens/character-combos-screen/character-combos-screen.component';
import {CharacterKeyMovesScreenComponent} from './character/detail/subscreens/key-moves-screen/character-key-moves-screen.component';
import {CharacterPunishesScreenComponent} from './character/detail/subscreens/punishes-screen/character-punishes-screen.component';
import {CharacterOverviewScreenComponent} from './character/detail/subscreens/overview-screen/character-overview-screen.component';
import {ComponentModule} from '../components/component.module';
import {PipeModule} from '../pipes/pipe.module';
import {DirectiveModule} from '../directives/directive.module';
import {RoutingModule} from '../modules/routing/routing.module';



@NgModule({
  declarations: [
    CharacterSelectScreenComponent,
    DashboardScreenComponent,
    CharacterDetailScreenComponentComponent,
    CharacterMovelistScreenComponent,
    CharacterCombosScreenComponent,
    CharacterKeyMovesScreenComponent,
    CharacterPunishesScreenComponent,
    CharacterOverviewScreenComponent,
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
    CharacterDetailScreenComponentComponent,
    CharacterMovelistScreenComponent,
    CharacterCombosScreenComponent,
    CharacterKeyMovesScreenComponent,
    CharacterPunishesScreenComponent,
    CharacterOverviewScreenComponent,
  ]
})
export class ScreenModule { }
