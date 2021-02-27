import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[tgDiscordLink]'
})
export class DiscordLinkDirective {

  @HostBinding('attr.href')
  public discordLink = 'https://discord.gg/ryKyJESqga';

  @HostBinding('attr.target')
  public target = '_blank';

  @HostBinding('class')
  public classes = 'secondary underline';

  constructor() {
  }

}
