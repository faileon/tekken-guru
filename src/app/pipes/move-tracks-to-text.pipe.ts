import { Pipe, PipeTransform } from '@angular/core';
import { Move, MoveProperty } from '../types';

@Pipe({
  name: 'moveTracksToText',
})
export class MoveTracksToTextPipe implements PipeTransform {
  transform(move: Move): string {
    if (!move.weakSide) {
      return 'This move has no tracking';
    }

    return (
      {
        SSR: 'This move is weak to side <strong>step right</strong>.',
        SSL: 'This move is weak to side <strong>step left</strong>.',
        SWR: 'This move is weak to side <strong>walk right</strong>.',
        SWL: 'This move is weak to side <strong>walk left</strong>.',
        SS: 'This move is weak to side <strong>step in any direction</strong>.',
        SW: 'This move is weak to side <strong>walk in any direction</strong>.',
      } as Record<Move['weakSide'], string>
    )[move.weakSide];
  }
}
