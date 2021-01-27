import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comboNotation'
})
export class ComboNotationPipe implements PipeTransform {

  transform(input: string): string[] {
    return input.split(';');
  }

}
