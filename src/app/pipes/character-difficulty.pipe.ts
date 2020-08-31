import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterDifficulty'
})
export class CharacterDifficultyPipe implements PipeTransform {

  transform(value?: number): unknown {
    switch (value) {
      case 1:
        return 'Easy difficulty';
      case 2:
        return 'Medium difficulty';
      case 3:
        return 'Hard difficulty';
      default:
        return 'Unknown difficulty';
    }
  }

}
