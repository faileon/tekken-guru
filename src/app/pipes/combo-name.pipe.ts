import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'comboName'
})
export class ComboNamePipe implements PipeTransform {

  transform(value: string): { title: string, notation: string } {
    const splitCategory = value.split(';');
    return {
      title: splitCategory.length > 0 ? splitCategory[0] : '???',
      notation: splitCategory.length > 1 ? splitCategory[1] : '???'
    };
  }

}
