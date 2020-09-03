import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hitMove'
})
export class HitMovePipe implements PipeTransform {

  transform(move: string[]): string {
    const len = move.length;
    const hits = len > 1 ? 'Hits' : 'Hit';
    return `${len} ${hits} (${move.join(', ')})`;
  }

}
