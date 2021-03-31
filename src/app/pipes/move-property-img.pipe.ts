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
      case 'WALL BREAK':
        return `${prefix}/wall-break.png`;
      case 'WALL SPLAT':
        return `${prefix}/wall-splat.png`;
      case 'FLOOR BREAK':
        return `${prefix}/floor-break.png`;
      case 'THROW 1':
        return `${prefix}/throw-1.png`;
      case 'THROW 2':
        return `${prefix}/throw-2.png`;
      case 'THROW 1+2':
        return `${prefix}/throw-1+2.png`;
      default:
        return `${prefix}/low-crush.png`;
    }
  }

}
