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
  ViewChild
} from '@angular/core';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'tg-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoComponent implements OnInit, AfterViewInit, OnDestroy {

  public playbackSpeedIcon = {
    prefix: 'tg',
    iconName: 'playback-speed',
    // @ts-ignore
    icon: [
      250,
      250,
      [],
      '',
      'M209.81,216.89c-46.93,43.68-120,44.1-168.68.8C-6.36,175.46-13.79,102.55,24.41,50.87,63.63-2.19,132.46-12.07,181.51,13.78a.49.49,0,0,1,.2.65c-2.6,5.1-5.23,10.19-7.79,15.33-1.32,2.62-3,1.28-4.6.53a104.21,104.21,0,0,0-18.76-6.68,93.07,93.07,0,0,0-14.63-2.5.49.49,0,0,0-.53.48V44.21a.49.49,0,0,1-.48.48H115.46a.48.48,0,0,1-.48-.48V22a.5.5,0,0,0-.45-.49c-14.62-.76-42.53,10.65-54.61,22a.48.48,0,0,0,0,.7L75.47,59.44a.49.49,0,0,1,0,.69L61.2,74.2a.48.48,0,0,1-.68,0L45.63,59a.48.48,0,0,0-.65-.05C34.19,67.69,21,99,21.52,114a.49.49,0,0,0,.49.46H44.36a.49.49,0,0,1,.48.49v19.47a.49.49,0,0,1-.48.49H21.42a.5.5,0,0,0-.49.55c3.91,30.72,17.14,55.36,41.1,72.84A107.41,107.41,0,0,0,185.9,209.9c25-17.23,38.91-42.43,43.26-74.24a.5.5,0,0,0-.48-.56h-23a.48.48,0,0,1-.48-.48V115.11a.49.49,0,0,1,.48-.48h22.51a.49.49,0,0,0,.49-.49c0-6.64-1.67-12.43-3.21-18.24s-4.07-11.47-6.67-17.65a.49.49,0,0,1,.23-.62L235.67,69a.49.49,0,0,1,.65.19C257.86,107.36,257.41,172.6,209.81,216.89ZM163.1,59.83,220.18,31.1s-11.32,23.77-18.51,35.73c-15.07,25.09-27.71,51.56-43.5,76.24-6.77,10.58-15.79,17.35-28.52,19.12-18.38,2.55-36.85-9.95-41.18-28.25-3.74-15.8,2.11-31.1,15.79-40.34C123,80.91,143.14,70.47,163.1,59.83Zm-26,62.24q-7.77-5.44-15.9-10.41c-2.83-1.73-4.56-.69-4.72,2.65-.17,3.52,0,7,0,10.57s-.11,6.85,0,10.26,2.6,4.76,5.53,3q7.73-4.78,15.16-10C139.57,126.31,139.52,123.8,137.06,122.07Zm32.47-42.56-24,13.09a.48.48,0,0,0-.06.81,49.19,49.19,0,0,1,11.19,11.44.48.48,0,0,0,.82,0l13.42-23.95Z'
    ]
    // tslint:disable-next-line:no-any
  } as any;

  // private _currentIcon: Subject<IconProp>;
  // public currentIcon$: Observable<IconProp>;
  public currentIcon: IconProp;

  @Input()
  public src!: string;

  @Input()
  public poster?: string;

  @Input()
  public mediaType = 'video/mp4';

  @ViewChild('videoElement')
  private videoElementRef!: ElementRef<HTMLVideoElement>;

  @ViewChild('seekbar')
  private seekbarElementRef!: ElementRef<HTMLInputElement>;

  @Input()
  public fixedHeight = true;

  public isPlaying = false;
  public isFullscreen = false;
  public isPlaybackOverlayOpen = false;

  @HostListener('fullscreenchange', []) fullScreen(): void {
    this.isFullscreen = !!document.fullscreenElement;
  }


  constructor(private elementRef: ElementRef<HTMLElement>, private changeDetectionRef: ChangeDetectorRef) {
    // this._currentIcon = new Subject();
    // this.currentIcon$ = this._currentIcon.asObservable();
    this.currentIcon = 'play';
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // setup video -> seekbar interaction
    this.videoElementRef.nativeElement.ontimeupdate = () => {
      const {currentTime, duration} = this.videoElementRef.nativeElement;
      const {max} = this.seekbarElementRef.nativeElement;
      const newValue = currentTime / duration * parseInt(max, 10);
      this.seekbarElementRef.nativeElement.value = newValue.toString();
    };

    // setup seekbar -> video interaction
    this.seekbarElementRef.nativeElement.oninput = () => {


      const {duration} = this.videoElementRef.nativeElement;
      const {value, max} = this.seekbarElementRef.nativeElement;

      if (duration) {
        this.videoElementRef.nativeElement.currentTime = duration * parseInt(value, 10) / parseInt(max, 10);
      }
    };
  }

  ngOnDestroy(): void {
    this.isPlaying = false;
  }

  public togglePlay(): void {
    if (!this.isPlaying) {
      this.currentIcon = 'spinner';
      // play and on success set playing to true
      this.videoElementRef.nativeElement.play().then(_ => {
        this.isPlaying = true;
        this.currentIcon = null;
        this.changeDetectionRef.detectChanges();
      });

      // hookup onended function to turn off isPlaying
      this.videoElementRef.nativeElement.onended = () => {
        this.isPlaying = false;
      };
    } else {
      // pause and turn off isPlaying
      this.videoElementRef.nativeElement.pause();
      this.isPlaying = false;
      this.currentIcon = 'play';
    }
  }

  public async toggleExpand(event: Event): Promise<void> {
    event.stopPropagation();
    try {
      if (this.isFullscreen) {
        await document.exitFullscreen();
      } else {
        await this.elementRef.nativeElement.requestFullscreen({navigationUI: 'hide'});
      }
    } catch (e) {
      console.log('Error toggling fullscreen.', e);
    }

  }

  public onPlaybackSpeedChange(event: Event): void {
    const {value} = event.target as HTMLInputElement;

    this.videoElementRef.nativeElement.playbackRate = parseFloat(value);
  }

}
