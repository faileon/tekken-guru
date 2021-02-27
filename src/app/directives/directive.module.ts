import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BadgeDirective} from './badge.directive';
import {TooltipDirective} from './tooltip.directive';
import {OverlayModule} from '@angular/cdk/overlay';
import { DiscordLinkDirective } from './discord-link.directive';


@NgModule({
  declarations: [
    BadgeDirective,
    TooltipDirective,
    DiscordLinkDirective,
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
    exports: [
        BadgeDirective,
        TooltipDirective,
        DiscordLinkDirective,
    ]
})
export class DirectiveModule {
}
