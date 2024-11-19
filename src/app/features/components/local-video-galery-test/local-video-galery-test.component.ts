import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VideoDownload } from '../../../models/video-download.model';
import { ActivatedRoute } from '@angular/router'; // Catch video_id
import { interval, switchMap, takeWhile } from 'rxjs';
import { PollingService } from '../../../core/services/polling/polling.service';

@Component({
  selector: 'app-local-video-galery-test',
  templateUrl: './local-video-galery-test.component.html',
  styleUrls: ['./local-video-galery-test.component.scss']
})
export class LocalVideoGaleryTestComponent {
  @Input() localVideos: VideoDownload[] = [];
  @Output() play = new EventEmitter<VideoDownload>();

  defaultThumbnail: string =
    'https://videoflix-server.mathias-kohler.de/static/images/coming-soon.jpg?v=1';


  constructor(
    private route: ActivatedRoute,
    private pollingService: PollingService
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
        interval(5000) // Alle 5 Sekunden
          .pipe(
            switchMap(() => this.pollingService.checkThumbnailStatus(video.id)),
            takeWhile((response) => !response.thumbnail_created, true) // Beende Polling, wenn Thumbnail erstellt ist
          )
          .subscribe((response) => {
            if (response.thumbnail_created) {
              video.thumbnail = response.thumbnail; // Aktualisiere das Thumbnail
            }
          });
      }
    });
  }
}
