import { Pipe, PipeTransform } from '@angular/core';
import { Punishment } from '../types';

@Pipe({
  name: 'punishmentText',
})
export class PunishmentTextPipe implements PipeTransform {
  transform(punish: Punishment): string {
    const standing = '<span class="standing">standing</span>';
    const crouching = '<span class="crouching">crouching</span>';

    if (punish.isCrouching && punish.isStanding) {
      return `${standing}, ${crouching}`;
    } else if (punish.isStanding) {
      return standing;
    } else {
      return crouching;
    }
  }

  // transform(punishment: Punishment) {
  //   if (punishment.isStanding && punishment.isCrouching) {
  //     return `standing, crouching`;
  //   } else if (punishment.isStanding) {
  //     return 'standing';
  //   } else {
  //     return 'crouching';
  //   }
  // }
}
