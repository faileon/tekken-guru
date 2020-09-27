import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'includes'
})
export class IncludesPipe implements PipeTransform {

  transform<T>(array: T[], element: T): boolean {
    return array.includes(element);
  }

}
