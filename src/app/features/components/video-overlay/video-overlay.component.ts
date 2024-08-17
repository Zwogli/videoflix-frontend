import { Component, Input } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { VideoDownload } from '../../../models/video-download.model';

@Component({
  selector: 'app-video-overlay',
  templateUrl: './video-overlay.component.html',
  styleUrls: ['./video-overlay.component.scss'],
})
export class VideoOverlayComponent {
  @Input() video!: VideoDownload;

  isVisible = false;

  constructor(private httpService: HttpService){}

  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }

  deleteVideo() {
    if (confirm('Möchten Sie dieses Video wirklich löschen?')) {
      this.httpService.delete(`/api/videos/local-videos/${this.video.id}/`)
        .subscribe({
          next: (response) => {
            console.log('Video erfolgreich gelöscht', response);
            // Aktualisiere die Video-Liste oder Navigiere zu einer anderen Seite
            this.close(); // Diese Methode musst du implementieren
          },
          error: (error) => {
            console.error('Fehler beim Löschen des Videos:', error);
          }
        });
    }
  }
}
