import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { VideoDownload } from '../../../models/video-download.model';
import { ActivatedRoute } from '@angular/router'; // Catch video_id
import { interval, of } from 'rxjs';
import { switchMap, takeWhile, catchError } from 'rxjs/operators';
import { PollingService } from '../../../core/services/polling/polling.service';

@Component({
  selector: 'app-local-video-galery-test',
  templateUrl: './local-video-galery-test.component.html',
  styleUrls: ['./local-video-galery-test.component.scss'],
})
export class LocalVideoGaleryTestComponent implements OnChanges {
  @Input() localVideos: VideoDownload[] = []; // Data load via input
  @Output() play = new EventEmitter<VideoDownload>();

  defaultThumbnail: string =
    'https://videoflix-server.mathias-kohler.de/static/images/coming-soon.jpg?v=1';

  constructor(
    private route: ActivatedRoute,
    private pollingService: PollingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['localVideos'] && this.localVideos.length > 0) {
      this.startPollingForThumbnails();
    }
    console.log('start polling localVideos aktualisiert:', this.localVideos);
  }

  playVideo(video: VideoDownload): void {
    this.play.emit(video);
  }

  startPollingForThumbnails(): void {
    console.log('polling localVideos status:', this.localVideos);
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
