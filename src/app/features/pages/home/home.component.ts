import { Component } from '@angular/core';
import { Video } from '../../../models/video.models';
import { VideoService } from '../../../shared/services/video/video.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  videos: Video[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.videoService.getGlobalVideos().subscribe((data: Video[]) => {
      this.videos = data;
    });
  }
}
