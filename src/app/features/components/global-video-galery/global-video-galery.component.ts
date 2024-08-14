import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Video } from '../../../models/video.model';

@Component({
  selector: 'app-global-video-galery',
  templateUrl: './global-video-galery.component.html',
  styleUrls: ['./global-video-galery.component.scss'],
})
export class GlobalVideoGaleryComponent {
  @Input() globalVideos: Video[] = [];
  @Output() play = new EventEmitter<Video>();

  playVideo(video: Video): void {
    this.play.emit(video);
  }
}
