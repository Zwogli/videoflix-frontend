import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VideoDownload } from '../../../models/video-download.model';
import { LocalThumbnailService } from 'src/app/core/services/local-thumbnail/local-thumbnail.service';
import { ActivatedRoute } from '@angular/router'; // Catch video_id
import { interval, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-local-video-galery',
  templateUrl: './local-video-galery.component.html',
  styleUrls: ['./local-video-galery.component.scss'],
})
export class LocalVideoGaleryComponent {
  @Input() localVideos: VideoDownload[] = [];
  @Output() play = new EventEmitter<VideoDownload>();
  defaultThumbnail: string =
    'https://videoflix-server.mathias-kohler.de/static/images/coming-soon.jpg?v=1';
  videoId?: number;
  thumbnailCreated: boolean = false;

  constructor(
    private localThumbnailService: LocalThumbnailService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const videoIdParam = this.route.snapshot.paramMap.get('id');
    if (videoIdParam) {
      this.videoId = +videoIdParam; // Konvertiere die ID in eine Zahl
      this.startCheckingThumbnailStatus();
    }
    console.debug('Video ID Param:', videoIdParam);
  }

  startCheckingThumbnailStatus(): void {
    if (this.videoId !== undefined) {
      const pollingSubscription = interval(10000)
        .pipe(
          switchMap(() => this.localThumbnailService.checkThumbnailStatus(this.videoId as number)),
          tap((response) => {
            if (response.thumbnailCreated) {
              this.thumbnailCreated = true;
              console.log('Thumbnail wurde erstellt!');
              // Verwende die vom Backend bereitgestellte URL für das Thumbnail
              const video = this.localVideos.find((v) => v.id === this.videoId);
              if (video) {
                video.thumbnail = response.thumbnailUrl; // Setze die neue URL
              }
              pollingSubscription.unsubscribe(); // Stoppe das Polling
            }
          })
        )
        .subscribe({
          error: (error) => {
            console.error('Fehler beim Abrufen des Thumbnail-Status:', error);
          },
        });
    } else {
      console.error('Video-ID ist nicht definiert');
    }
  }

  // startCheckingThumbnailStatus(): void {
  //   if (this.videoId !== undefined) {
  //     interval(10000)
  //       .pipe(
  //         switchMap(() =>
  //           this.localThumbnailService.checkThumbnailStatus(
  //             this.videoId as number
  //           )
  //         ), // Wechselt zum Observable für den Status des Thumbnails
  //         tap((response) => {
  //           if (response.thumbnailCreated) {
  //             this.thumbnailCreated = true;
  //             console.log('Thumbnail wurde erstellt!');
  //           }
  //         })
  //       )
  //       .subscribe({
  //         error: (error) => {
  //           console.error('Fehler beim Abrufen des Thumbnail-Status:', error);
  //         },
  //       });
  //   } else {
  //     console.error('Video-ID ist nicht definiert');
  //   }
  // }

  playVideo(video: VideoDownload): void {
    this.play.emit(video);
  }
}
