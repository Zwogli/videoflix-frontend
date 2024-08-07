import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-overlay',
  templateUrl: './video-overlay.component.html',
  styleUrls: ['./video-overlay.component.scss'],
})
export class VideoOverlayComponent {
  @Input() videoFile!: string;
  @Input() videoTitle!: string;
  @Input() videoDescription!: string;

  isVisible = false;

  open(videoFile: string, videoTitle: string, videoDescription: string): void {
    this.videoFile = videoFile;
    this.videoTitle = videoTitle;
    this.videoDescription = videoDescription;
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }
}
