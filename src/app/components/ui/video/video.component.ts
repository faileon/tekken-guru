import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'tg-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  @Input()
  public src!: string;

  @Input()
  public mediaType = 'video/mp4';

  @ViewChild('videoElement', {static: false})
  private videoElement!: ElementRef<HTMLVideoElement>;

  @Input()
  public fixedHeight = true;

  private isPlaying = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public playVideo(): void {
    if (!this.isPlaying) {
      this.videoElement.nativeElement.play();
    } else {
      this.videoElement.nativeElement.pause();
    }
    this.isPlaying = !this.isPlaying;
  }

}
