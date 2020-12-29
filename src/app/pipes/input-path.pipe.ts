import {Pipe, PipeTransform} from '@angular/core';
import {buttonMap, directionMap} from '../utils/input-map';

@Pipe({
  name: 'inputPath'
})
export class InputPathPipe implements PipeTransform {

  transform(input: string, platform: PlatformInput = 'ps4'): string {
    // button
    const buttonKeys = Object.keys(buttonMap);
    if (buttonKeys.includes(input)) {
      return `assets/inputs/buttons/${platform}/${buttonMap[input]}`;
    }

    // direction
    const directionKeys = Object.keys(directionMap);
    if (directionKeys.includes(input)) {
      return `assets/inputs/directions/${directionMap[input]}`;
    }

    // unknown, leave as is
    console.error('Input', input, 'is not known.');
    return input;
  }

}

type PlatformInput = 'ps4' | 'steam' | 'xbox';
