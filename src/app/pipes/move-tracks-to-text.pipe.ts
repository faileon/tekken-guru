import { Pipe, PipeTransform } from '@angular/core';
import { Move, MoveProperty } from '../types';

@Pipe({
  name: 'moveTracksToText',
})
export class MoveTracksToTextPipe implements PipeTransform {
  transform(move: Move): string {
    if (!move.tracksTo) {
      return 'This move has no tracking';
    }

    if (move.tracksTo === 'LEFT') {
      return 'This move has good tracking to the <strong>LEFT </strong> side. <br>You might want to sidestep to the <strong>RIGHT</strong> side.';
    } else {
      return 'This move has good tracking to the <strong>RIGHT</strong> side. <br>You might want to sidestep to the <strong>LEFT</strong> side.';
    }
  }
}
