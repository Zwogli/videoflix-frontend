import { Component, Input } from '@angular/core';
import { Video } from '../../../models/video.models'; 

@Component({
  selector: 'app-global-video-galery',
  templateUrl: './global-video-galery.component.html',
  styleUrls: ['./global-video-galery.component.scss']
})
export class GlobalVideoGaleryComponent {
  @Input() videos: Video[] = [];
}
