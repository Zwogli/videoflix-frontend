import { Component, ViewChild } from '@angular/core';
import { Video } from '../../../models/video.models';
import { VideoService } from '../../../shared/services/video/video.service';
import { VideoOverlayComponent } from '../../components/video-overlay/video-overlay.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  globalVideos: Video[] = [];
  localVideos: Video[] = [];
  featuredVideo: Video | null = null;

  overlayVideoFile: string = '';
  overlayVideoTitle: string = '';
  overlayVideoDescription: string = '';

  @ViewChild('videoOverlay') videoOverlay!: VideoOverlayComponent;

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  loadVideos(): void {
    this.loadGloabalVideos();
    this.loadLocalVideos();
  }

  loadGloabalVideos(): void {
    this.videoService.getGlobalVideos().subscribe({
      next: (data: Video[]) => {
        this.globalVideos = data;
        this.loadFeatureVideo();
      },
      error: (err) => {
        console.error('Fehler beim Laden der Globalen Videos:', err);
      }
    });
  }

  loadFeatureVideo(): void{
    if (this.hasVideos()) {
      this.featuredVideo = this.globalVideos[0];
    }
  }

  hasVideos(){
    return this.globalVideos.length > 0
  }

  loadLocalVideos(): void {
    this.videoService.getLocalVideos().subscribe({
      next: (data: Video[]) => {
        this.localVideos = data;
      },
      error: (err) => {
        console.error('Fehler beim Laden der Localen Videos:', err);
      }
    });
  }

  playVideo(video: Video): void {
    this.overlayVideoFile = video.file;
    this.overlayVideoTitle = video.title;
    this.overlayVideoDescription = video.description;
    this.videoOverlay.open(video.file, video.title, video.description);
  }
}
