import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VideoDownload } from '../../../models/video-download.model';

@Component({
  selector: 'app-local-video-galery',
  templateUrl: './local-video-galery.component.html',
  styleUrls: ['./local-video-galery.component.scss'],
})
export class LocalVideoGaleryComponent {
  @Input() localVideos: VideoDownload[] = [];
  @Output() play = new EventEmitter<VideoDownload>();
  defaultThumbnail: string = '/static/images/coming-soon.jpg?v=1';

  playVideo(video: VideoDownload): void {
    this.play.emit(video);
  }
}
