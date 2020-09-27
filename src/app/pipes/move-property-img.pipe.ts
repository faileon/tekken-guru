import { Pipe, PipeTransform } from '@angular/core';
import {MoveProperty} from '../types';

@Pipe({
  name: 'movePropertyImg'
})
export class MovePropertyImgPipe implements PipeTransform {

  transform(property: MoveProperty): string {
    const prefix = '/assets/img/move-properties';
    switch (property) {
      default:
        return `${prefix}/low_crush.png`;
    }
  }

}
