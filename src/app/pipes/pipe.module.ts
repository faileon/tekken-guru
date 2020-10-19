import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacterDifficultyPipe} from './character-difficulty.pipe';
import {MediaPathPipe} from './media-path.pipe';
import {HitMovePipe} from './hit-move.pipe';
import {HitDamagePipe} from './hit-damage.pipe';
import {IncludesPipe} from './includes.pipe';
import {MovePropertyImgPipe} from './move-property-img.pipe';
import {MovePropertyTextPipe} from './move-property-text.pipe';
import { ThumbnailPathPipe } from './thumbnail-path.pipe';


@NgModule({
  declarations: [
    CharacterDifficultyPipe,
    MediaPathPipe,
    HitMovePipe,
    HitDamagePipe,
    IncludesPipe,
    MovePropertyImgPipe,
    MovePropertyTextPipe,
    ThumbnailPathPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CharacterDifficultyPipe,
    MediaPathPipe,
    HitMovePipe,
    HitDamagePipe,
    IncludesPipe,
    MovePropertyImgPipe,
    MovePropertyTextPipe,
    ThumbnailPathPipe
  ]
})
export class PipeModule {
}
