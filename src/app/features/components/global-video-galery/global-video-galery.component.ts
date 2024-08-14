import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VideoDownload } from '../../../models/video-download.model';

@Component({
  selector: 'app-global-video-galery',
  templateUrl: './global-video-galery.component.html',
  styleUrls: ['./global-video-galery.component.scss'],
})
export class GlobalVideoGaleryComponent {
  @Input() globalVideos: VideoDownload[] = [];
  @Output() play = new EventEmitter<VideoDownload>();

  playVideo(video: VideoDownload): void {
    this.play.emit(video);
  }
}
