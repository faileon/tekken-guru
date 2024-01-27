import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'tg-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent {
  @Input()
  public src!: string;

  @Input()
  public poster?: string;

  @Input()
  public mediaType = 'video/mp4';

  @Input()
  public fixedHeight = true;

  public isFullScreen = false;

  onFullScreenChange(event: Event) {
    this.isFullScreen = !this.isFullScreen;
  }

  onError(error: any) {
    console.log('error', error.name, error.message, error);
  }
}
