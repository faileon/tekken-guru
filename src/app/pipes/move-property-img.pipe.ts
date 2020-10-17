import { Pipe, PipeTransform } from '@angular/core';
import {MoveProperty} from '../types';

@Pipe({
  name: 'movePropertyImg'
})
export class MovePropertyImgPipe implements PipeTransform {

  transform(property: MoveProperty): string {
    const prefix = '/assets/img/move-properties';
    switch (property) {
      case 'HOMING':
        return `${prefix}/homing.png`;
      case 'POWER CRUSH':
        return `${prefix}/power-crush.png`;
      case 'WALL BOUNCE':
        return `${prefix}/wall-bounce.png`;
      case 'SCREW':
        return `${prefix}/screw.png`;
      default:
        return `${prefix}/low_crush.png`;
    }
  }

}
