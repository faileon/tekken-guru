import {Pipe, PipeTransform} from '@angular/core';
import {FirestoreBucketPath} from '../config/storage.config';

@Pipe({
  name: 'mediaPath'
})
export class MediaPathPipe implements PipeTransform {

  transform(url: string): string {
    return `${FirestoreBucketPath}${encodeURIComponent(url)}?alt=media`;
  }

}
