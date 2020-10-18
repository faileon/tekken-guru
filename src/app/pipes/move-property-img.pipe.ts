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
      case 'LOW CRUSH':
        return `${prefix}/low-crush.png`;
      case 'HIGH CRUSH':
        return `${prefix}/high-crush.png`;
      default:
        return `${prefix}/low-crush.png`;
    }
  }

}
