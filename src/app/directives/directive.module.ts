import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BadgeDirective} from './badge.directive';
import { TooltipDirective } from './tooltip.directive';
import {OverlayModule} from '@angular/cdk/overlay';



@NgModule({
  declarations: [
    BadgeDirective,
    TooltipDirective,
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
    exports: [
        BadgeDirective,
        TooltipDirective,
    ]
})
export class DirectiveModule { }
