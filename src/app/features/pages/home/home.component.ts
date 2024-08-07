import { Component } from '@angular/core';
import { Video } from '../../../models/video.models';
import { VideoService } from '../../../shared/services/video/video.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  globalVideos: Video[] = [];
  localVideos: Video[] = [];
  featuredVideo: Video | null = null;

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

        if (this.globalVideos.length > 0) {
          this.featuredVideo = this.globalVideos[0];
        }
      },
      error: (err) => {
        console.error('Fehler beim Laden der Globalen Videos:', err);
      }
    });
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

  playVideo(videoFile: string): void {
    // todo Implementiere die Logik, um das Video abzuspielen
    console.log('Spiele Video ab:', videoFile);
    // Du könntest hier einen Video-Player anzeigen oder eine Navigation zu einer Video-Seite auslösen
  }
}
