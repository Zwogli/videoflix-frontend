import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Video } from '../../../models/video.models';

@Component({
  selector: 'app-featured-video',
  templateUrl: './featured-video.component.html',
  styleUrls: ['./featured-video.component.scss']
})
export class FeaturedVideoComponent {
  @Input() featuredVideo!: Video; // The featured video is expected as input from the parent component
  @Output() play = new EventEmitter<Video>();

  playVideo(): void {
    this.play.emit(this.featuredVideo);
  }
}
