import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Video } from '../../../models/video.model';

@Component({
  selector: 'app-local-video-galery',
  templateUrl: './local-video-galery.component.html',
  styleUrls: ['./local-video-galery.component.scss'],
})
export class LocalVideoGaleryComponent {
  @Input() localVideos: Video[] = [];
  @Output() play = new EventEmitter<Video>();

  playVideo(video: Video): void {
    this.play.emit(video);
  }
}
