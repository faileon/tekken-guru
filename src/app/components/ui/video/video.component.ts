import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'tg-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public src!: string;

  @Input()
  public poster?: string;

  @Input()
  public mediaType = 'video/mp4';

  @ViewChild('videoElement', {static: false})
  private videoElement!: ElementRef<HTMLVideoElement>;

  @ViewChild('center')
  private centerControl: ElementRef<HTMLDivElement>;

  @Input()
  public fixedHeight = true;

  public isPlaying = false;
  public showControls = false;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }

  public playVideo(): void {
    this.showControls = true;
    if (!this.isPlaying) {
      // play and on success set playing to true
      this.videoElement.nativeElement.play().then(_ => this.isPlaying = true);

      // hookup onended function to turn off isPlaying
      this.videoElement.nativeElement.onended = () => {
        this.isPlaying = false;
      };
    } else {
      // pause and turn off isPlaying
      this.videoElement.nativeElement.pause();
      this.isPlaying = false;
    }
  }

}
