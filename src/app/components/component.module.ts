import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputNotationComponent} from './input-notation/input-notation.component';
import {CharacterGridComponent} from './character/select/grid/character-grid.component';
import {ButtonComponent} from './ui/button/button.component';
import {CharacterHeaderComponent} from './character/detail/character-header/character-header.component';
import {MoveListComponent} from './move/list/move-list.component';
import {MoveGridComponent} from './move/grid/move-grid.component';
import {TabsComponent} from './ui/tabs/tabs.component';
import {CardComponent} from './ui/card/card.component';
import {VideoComponent} from './ui/video/video.component';
import {PopOverButtonComponent} from './ui/pop-over-button/pop-over-button.component';
import {SearchBarComponent} from './ui/search-bar/search-bar.component';
import {SliderComponent} from './ui/slider/slider.component';
import {FilterTemplateComponent} from './ui/filters/filter-template/filter-template.component';
import {StartUpFrameFilterComponent} from './ui/filters/start-up-frame-filter/start-up-frame-filter.component';
import {NormalFrameFilterComponent} from './ui/filters/normal-frame-filter/normal-frame-filter.component';
import {BlockFrameFilterComponent} from './ui/filters/block-frame-filter/block-frame-filter.component';
import {CounterFrameFilterComponent} from './ui/filters/counter-frame-filter/counter-frame-filter.component';
import {PipeModule} from '../pipes/pipe.module';
import {Ng5SliderModule} from 'ng5-slider';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import {RoutingModule} from '../modules/routing/routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [InputNotationComponent,
    CharacterGridComponent,
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
  ],
  imports: [
    CommonModule,
    PipeModule,
    Ng5SliderModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RoutingModule,
    FlexLayoutModule,
  ],
  exports: [
    InputNotationComponent,
    CharacterGridComponent,
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
  ]
})
export class ComponentModule {
}
