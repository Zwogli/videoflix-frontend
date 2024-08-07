import { Component, Input } from '@angular/core';
import { Video } from '../../../models/video.models';

@Component({
  selector: 'app-featured-video',
  templateUrl: './featured-video.component.html',
  styleUrls: ['./featured-video.component.scss']
})
export class FeaturedVideoComponent {
  @Input() featuredVideo!: Video; // The featured video is expected as input from the parent component

  playVideo(videoFile: string): void {
    console.log('Spiele Video ab:', videoFile);
    // todo Implementiere hier die Logik, um das Video abzuspielen, z. B. mit einem Video-Player
  }
}
