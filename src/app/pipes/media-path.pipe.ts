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
  constructor(private gameService: GameService) {}

  async transform(url: string): Promise<string> {
    const selectedGame = await firstValueFrom(this.gameService.selectedGame$);
    const basePath =
      selectedGame?.value === 'tekken7'
        ? FirestoreBucketPath
        : FirestoreBucketPathT8;
    return `${basePath}${encodeURIComponent(url)}?alt=media`;
  }
}
