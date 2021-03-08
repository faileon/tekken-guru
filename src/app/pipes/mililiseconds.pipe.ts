import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ms'
})
export class MililisecondsPipe implements PipeTransform {

  transform(value: number): string {
    const milliseconds = Number((value || 0).toFixed(3)) * 1000;
    return `~${milliseconds} ms`;
  }

}
