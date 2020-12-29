import {Pipe, PipeTransform} from '@angular/core';
import {buttonMap, directionMap} from '../utils/input-map';

@Pipe({
  name: 'isKnownInput'
})
export class IsKnownInputPipe implements PipeTransform {

  transform(input: string): boolean {
    const buttonKeys = Object.keys(buttonMap);
    const directionKeys = Object.keys(directionMap);
    return buttonKeys.includes(input) || directionKeys.includes(input);
  }

}
