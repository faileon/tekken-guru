import {Pipe, PipeTransform} from '@angular/core';
import {FirestoreBucketPath} from '../config/storage.config';

@Pipe({
  name: 'thumbnailPath'
})
export class ThumbnailPathPipe implements PipeTransform {

  transform(url: string): string {
    const parts = url.split('/');

    const thumbnailUrl = parts.reduce((acc, curr, idx) => {
      if (idx === parts.length - 1) {
        const videoName = curr.split('.')[0];
        const thumbnailName = `${videoName}_thumb.png`;
        acc.push(thumbnailName);
      } else {
        acc.push(curr);
      }

      return acc;
    }, [] as string[]).join('/');

    return `${FirestoreBucketPath}${encodeURIComponent(thumbnailUrl)}?alt=media`;
  }

}
