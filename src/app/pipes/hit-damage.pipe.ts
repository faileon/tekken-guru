import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hitDamage',
})
export class HitDamagePipe implements PipeTransform {
  transform(damage: number[], prefix = 'Damage'): string {
    if (damage.length <= 0) {
      return '0 Damage';
    }
    const dmgSum = damage.reduce((acc, curr) => {
      acc += curr;
      return acc;
    }, 0);

    return `${dmgSum} ${prefix} (${damage.join(', ')})`;
  }
}
