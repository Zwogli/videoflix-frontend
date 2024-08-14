import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VideoDownload } from '../../../models/video-download.model';

@Component({
  selector: 'app-featured-video',
  templateUrl: './featured-video.component.html',
  styleUrls: ['./featured-video.component.scss'],
})
export class FeaturedVideoComponent {
  @Input() featuredVideo!: VideoDownload; // The featured video is expected as input from the parent component
  @Output() play = new EventEmitter<VideoDownload>();

  playVideo(): void {
    this.play.emit(this.featuredVideo);
  }
}
