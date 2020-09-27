import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CharacterDifficultyPipe} from './character-difficulty.pipe';
import {MediaPathPipe} from './media-path.pipe';
import {HitMovePipe} from './hit-move.pipe';
import {HitDamagePipe} from './hit-damage.pipe';
import {IncludesPipe} from './includes.pipe';
import { MovePropertyImgPipe } from './move-property-img.pipe';



@NgModule({
  declarations: [
    CharacterDifficultyPipe,
    MediaPathPipe,
    HitMovePipe,
    HitDamagePipe,
    IncludesPipe,
    MovePropertyImgPipe,
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
    ]
})
export class PipeModule { }
