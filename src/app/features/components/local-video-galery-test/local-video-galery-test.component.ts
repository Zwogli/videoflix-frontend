import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VideoDownload } from '../../../models/video-download.model';
import { LocalThumbnailService } from 'src/app/core/services/local-thumbnail/local-thumbnail.service';
import { ActivatedRoute } from '@angular/router'; // Catch video_id
import { interval, switchMap, tap } from 'rxjs';

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
    // * Testpolling
  videoId?: number;
  thumbnailCreated: boolean = false;

  constructor(
    private route: ActivatedRoute,
  ) {}
 

  playVideo(video: VideoDownload): void {
    this.play.emit(video);
  }
}
