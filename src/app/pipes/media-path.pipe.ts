import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mediaPath'
})
export class MediaPathPipe implements PipeTransform {

  transform(url: string): string {
    return `https://firebasestorage.googleapis.com/v0/b/tekken-guru.appspot.com/o/${encodeURIComponent(url)}?alt=media`;
  }

}
