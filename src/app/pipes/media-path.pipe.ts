import { Pipe, PipeTransform } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import {
  FirestoreBucketPath,
  FirestoreBucketPathT8,
} from '../config/storage.config';
import { GameService } from '../services/game.service';
import { Game } from '../types/ui.types';

@Pipe({
  name: 'mediaPath',
})
export class MediaPathPipe implements PipeTransform {
  transform(url: string, selectedGame: Game): string {
    const basePath =
      selectedGame?.value === 'tekken7'
        ? FirestoreBucketPath
        : FirestoreBucketPathT8;
    return `${basePath}${encodeURIComponent(url)}?alt=media`;
  }
}
