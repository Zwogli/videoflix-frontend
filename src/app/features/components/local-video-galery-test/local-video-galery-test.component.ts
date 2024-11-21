import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VideoDownload } from '../../../models/video-download.model';
import { ActivatedRoute } from '@angular/router'; // Catch video_id
import { catchError, interval, of, switchMap, takeWhile } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { PollingService } from '../../../core/services/polling/polling.service';

@Component({
  selector: 'app-local-video-galery-test',
  templateUrl: './local-video-galery-test.component.html',
  styleUrls: ['./local-video-galery-test.component.scss'],
})
export class LocalVideoGaleryTestComponent {
  @Input() localVideos: VideoDownload[] = [];
  @Output() play = new EventEmitter<VideoDownload>();

  defaultThumbnail: string =
    'https://videoflix-server.mathias-kohler.de/static/images/coming-soon.jpg?v=1';

  constructor(
    private route: ActivatedRoute,
    private pollingService: PollingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.startPollingForThumbnails();
  }

  playVideo(video: VideoDownload): void {
    this.play.emit(video);
  }

  startPollingForThumbnails(): void {
    this.localVideos.forEach((video) => {
      if (!video.thumbnail) {
        interval(5000)
          .pipe(
            switchMap(() => this.pollingService.checkThumbnailStatus(video.id)),
            takeWhile((response) => !response.thumbnail_created, true),
            catchError((error) => {
              console.error(
                `Fehler beim Polling für Video ${video.id}:`,
                error
              );
              return of({ thumbnail_created: false, thumbnail: '' });
            })
          )
          .subscribe((response) => {
            if (response.thumbnail_created) {
              video.thumbnail = `${
                response.thumbnail
              }?v=${new Date().getTime()}`; // Cache-Busting
              this.cdr.detectChanges(); // View manuell aktualisieren
            }
          });
      }
    });
  }
}
