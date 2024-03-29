import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDifficultyPipe } from './character-difficulty.pipe';
import { MediaPathPipe } from './media-path.pipe';
import { HitMovePipe } from './hit-move.pipe';
import { HitDamagePipe } from './hit-damage.pipe';
import { IncludesPipe } from './includes.pipe';
import { MovePropertyImgPipe } from './move-property-img.pipe';
import { MovePropertyTextPipe } from './move-property-text.pipe';
import { ThumbnailPathPipe } from './thumbnail-path.pipe';
import { PunishmentTextPipe } from './punishment-text.pipe';
import { InputPathPipe } from './input-path.pipe';
import { IsKnownInputPipe } from './is-known-input.pipe';
import { ComboNotationPipe } from './combo-notation.pipe';
import { ComboNamePipe } from './combo-name.pipe';
import { MililisecondsPipe } from './mililiseconds.pipe';
import { MoveTracksToTextPipe } from './move-tracks-to-text.pipe';

@NgModule({
  declarations: [
    CharacterDifficultyPipe,
    MediaPathPipe,
    HitMovePipe,
    HitDamagePipe,
    IncludesPipe,
    MovePropertyImgPipe,
    MovePropertyTextPipe,
    MoveTracksToTextPipe,
    ThumbnailPathPipe,
    PunishmentTextPipe,
    InputPathPipe,
    IsKnownInputPipe,
    ComboNotationPipe,
    ComboNamePipe,
    MililisecondsPipe,
  ],
  imports: [CommonModule],
  exports: [
    CharacterDifficultyPipe,
    MediaPathPipe,
    HitMovePipe,
    HitDamagePipe,
    IncludesPipe,
    MovePropertyImgPipe,
    MovePropertyTextPipe,
    ThumbnailPathPipe,
    PunishmentTextPipe,
    IsKnownInputPipe,
    InputPathPipe,
    ComboNotationPipe,
    ComboNamePipe,
    MililisecondsPipe,
    MoveTracksToTextPipe,
  ],
})
export class PipeModule {}
