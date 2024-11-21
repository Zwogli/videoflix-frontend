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
            takeWhile((response) => response.status !== 'done', true),
            catchError((error) => {
              console.error(
                `Fehler beim Polling für Video ${video.id}:`,
                error
              );
              return of({ status: 'error', thumbnail_url: '' });
            })
          )
          .subscribe((response) => {
            console.log('Polling Response:', response); 
            if (response.status === 'done') {
              console.log('Thumbnail aktualisiert:', response.thumbnail_url);
              video.thumbnail = `${
                response.thumbnail_url
              }?v=${new Date().getTime()}`; // Cache-Busting
              // Neues Array zuweisen, damit Angular Änderungen erkennt
              this.localVideos = [...this.localVideos];
              this.cdr.detectChanges();
            } else {
              console.log('Thumbnail noch nicht erstellt:', response);
            }
          });
      }
    });
  }
}
