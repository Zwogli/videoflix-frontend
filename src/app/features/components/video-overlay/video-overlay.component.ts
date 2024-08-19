import { Component, Input } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { VideoDownload } from '../../../models/video-download.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../../shared/components/dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-video-overlay',
  templateUrl: './video-overlay.component.html',
  styleUrls: ['./video-overlay.component.scss'],
})
export class VideoOverlayComponent {
  @Input() video!: VideoDownload;

  isVisible = false;

  constructor(private httpService: HttpService, public dialog: MatDialog) {}

  open(video: VideoDownload): void {
    this.video = video;
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }

  deleteVideo() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.sendDeleteRequest();
      }
    });
  }

  sendDeleteRequest(): void {
    this.httpService
      .delete(`/api/videos/local-videos/${this.video.id}/`)
      .subscribe({
        next: (response) => {
          console.log('Video erfolgreich gelöscht', response);
          this.close();
        },
        error: (error) => {
          console.error('Fehler beim Löschen des Videos:', error);
        },
      });
  }
}
