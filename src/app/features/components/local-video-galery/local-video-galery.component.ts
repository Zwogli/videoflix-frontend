import { Component, Input } from '@angular/core';
import { Video } from '../../../models/video.models'; 

@Component({
  selector: 'app-local-video-galery',
  templateUrl: './local-video-galery.component.html',
  styleUrls: ['./local-video-galery.component.scss']
})
export class LocalVideoGaleryComponent {
  @Input() localVideos: Video[] = [];
}
