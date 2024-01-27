import { Pipe, PipeTransform } from '@angular/core';
import {
  FirestoreBucketPath,
  FirestoreBucketPathT8,
} from '../config/storage.config';
import { Game } from '../types/ui.types';

@Pipe({
  name: 'thumbnailPath',
})
export class ThumbnailPathPipe implements PipeTransform {
  transform(url: string, selectedGame: Game) {
    const basePath =
      selectedGame?.value === 'tekken7'
        ? FirestoreBucketPath
        : FirestoreBucketPathT8;
    // because i am dumbo and for t8 videos i did not name the thumbnails with sufix
    const sufix = selectedGame.value === 'tekken8' ? '' : '_thumb';
    const parts = url.split('/');

    const thumbnailUrl = parts
      .reduce((acc, curr, idx) => {
        if (idx === parts.length - 1) {
          const videoName = curr.split('.')[0];
          const thumbnailName = `${videoName}${sufix}.png`;
          acc.push(thumbnailName);
        } else {
          acc.push(curr);
        }

        return acc;
      }, [] as string[])
      .join('/');

    return `${basePath}${encodeURIComponent(thumbnailUrl)}?alt=media`;
  }
}
