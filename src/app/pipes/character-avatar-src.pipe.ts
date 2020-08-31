import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'characterAvatarSrc'
})
export class CharacterAvatarSrcPipe implements PipeTransform {

  transform(url: string): unknown {
    return `https://firebasestorage.googleapis.com/v0/b/tekken-guru.appspot.com/o/${encodeURIComponent(url)}?alt=media`;
  }

}
