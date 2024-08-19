import { Component, ViewChild } from '@angular/core';
import { VideoDownload } from '../../../models/video-download.model';
import { VideoService } from '../../../shared/services/video/video.service';
import { VideoOverlayComponent } from '../../components/video-overlay/video-overlay.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  globalVideos: VideoDownload[] = [];
  localVideos: VideoDownload[] = [];
  featuredVideo: VideoDownload | null = null;

  overlayVideoFile: string = '';
  overlayVideoTitle: string = '';
  overlayVideoDescription: string = '';

  overlayVideo: VideoDownload = {
    id: 0,
    title: '',
    description: '',
    thumbnail: '',
    file: '',
    is_local: false,
  };

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
      next: (data: VideoDownload[]) => {
        this.globalVideos = data;
        this.loadFeatureVideo();
      },
      error: (err) => {
        console.error('Fehler beim Laden der Globalen Videos:', err);
      },
    });
  }

  loadFeatureVideo(): void {
    if (this.hasVideos()) {
      this.featuredVideo = this.globalVideos[0];
    }
  }

  hasVideos() {
    return this.globalVideos.length > 0;
  }

  loadLocalVideos(): void {
    this.videoService.getLocalVideos().subscribe({
      next: (data: VideoDownload[]) => {
        this.localVideos = data;
      },
      error: (err) => {
        console.error('Fehler beim Laden der Localen Videos:', err);
      },
    });
  }

  playVideo(video: VideoDownload): void {
    this.overlayVideo = video;
    this.videoOverlay.open(video);
  }
}
