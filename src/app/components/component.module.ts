import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNotationComponent } from './input-notation/input-notation.component';
import { CharacterGridComponent } from './character/select/grid/character-grid.component';
import { ButtonComponent } from './ui/button/button.component';
import { CharacterHeaderComponent } from './character/detail/character-header/character-header.component';
import { MoveListComponent } from './move/list/move-list.component';
import { MoveGridComponent } from './move/grid/move-grid.component';
import { TabsComponent } from './ui/tabs/tabs.component';
import { CardComponent } from './ui/card/card.component';
import { VideoComponent } from './ui/video/video.component';
import { PopOverButtonComponent } from './ui/pop-over-button/pop-over-button.component';
import { SearchBarComponent } from './ui/search-bar/search-bar.component';
import { SliderComponent } from './ui/slider/slider.component';
import { FilterTemplateComponent } from './ui/filters/filter-template/filter-template.component';
import { StartUpFrameFilterComponent } from './ui/filters/start-up-frame-filter/start-up-frame-filter.component';
import { NormalFrameFilterComponent } from './ui/filters/normal-frame-filter/normal-frame-filter.component';
import { BlockFrameFilterComponent } from './ui/filters/block-frame-filter/block-frame-filter.component';
import { CounterFrameFilterComponent } from './ui/filters/counter-frame-filter/counter-frame-filter.component';
import { PipeModule } from '../pipes/pipe.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from '../modules/routing/routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MovePropertiesFilterComponent } from './ui/filters/move-properties-filter/move-properties-filter.component';
import { DirectiveModule } from '../directives/directive.module';
// import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { VirtualScrollerModule } from '@iharbeck/ngx-virtual-scroller';
import { TooltipComponent } from './ui/tooltip/tooltip.component';
import { HitLevelFilterComponent } from './ui/filters/hit-level-filter/hit-level-filter.component';
import { EmptyCardComponent } from './common/empty-card/empty-card.component';
import { NavigationBackComponent } from './ui/navigation-back/navigation-back.component';
import { NamedRouterComponent } from './matchup/named-router/named-router.component';
import { CardWithActionsComponent } from './ui/card-with-actions/card-with-actions.component';
import { ComboListComponent } from './combo/list/combo-list.component';
import { CollapsibleComponent } from './ui/collapsible/collapsible.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DropdownComponent } from './ui/dropdown/dropdown.component';

@NgModule({
  declarations: [
    InputNotationComponent,
    CharacterGridComponent,
    DropdownComponent,
    ButtonComponent,
    CharacterHeaderComponent,
    MoveListComponent,
    MoveGridComponent,
    TabsComponent,
    CardComponent,
    VideoComponent,
    PopOverButtonComponent,
    SearchBarComponent,
    SliderComponent,
    FilterTemplateComponent,
    StartUpFrameFilterComponent,
    NormalFrameFilterComponent,
    BlockFrameFilterComponent,
    CounterFrameFilterComponent,
    MovePropertiesFilterComponent,
    TooltipComponent,
    HitLevelFilterComponent,
    EmptyCardComponent,
    NavigationBackComponent,
    NamedRouterComponent,
    CardWithActionsComponent,
    ComboListComponent,
    CollapsibleComponent,
  ],
  imports: [
    CommonModule,
    PipeModule,
    NgxSliderModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RoutingModule,
    FlexLayoutModule,
    DirectiveModule,
    VirtualScrollerModule,
    FormsModule,
    ScrollingModule,
  ],
  exports: [
    InputNotationComponent,
    CharacterGridComponent,
    DropdownComponent,
    ButtonComponent,
    CharacterHeaderComponent,
    MoveGridComponent,
    TabsComponent,
    CardComponent,
    VideoComponent,
    PopOverButtonComponent,
    SearchBarComponent,
    SliderComponent,
    FilterTemplateComponent,
    StartUpFrameFilterComponent,
    NormalFrameFilterComponent,
    BlockFrameFilterComponent,
    CounterFrameFilterComponent,
    MovePropertiesFilterComponent,
    MoveListComponent,
    NavigationBackComponent,
    NamedRouterComponent,
    CardWithActionsComponent,
    EmptyCardComponent,
    ComboListComponent,
    CollapsibleComponent,
  ],
})
export class ComponentModule {}
