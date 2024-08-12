import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-video-card',
  templateUrl: './upload-video-card.component.html',
  styleUrls: ['./upload-video-card.component.scss'],
})
export class UploadVideoCardComponent {
  title: string = '';
  description: string = '';

  fileSelector: File | null = null;

  titleError: boolean = false;
  descriptionError: boolean = false;
  fileSelectorError: boolean = false;

  loading: boolean = false;

  onSubmit() {
    if (!this.isFormValid) {
      // Fehler behandeln
      this.titleError = this.title.trim() === '';
      this.descriptionError = this.description.trim() === '';
      this.fileSelectorError = this.fileSelector === null;
      return;
    }

    this.loading = true;

    // Implementiere hier die Logik zum Hochladen des Videos
  }

  get isFormValid(): boolean {
    return (
      this.title.trim() !== '' &&
      this.description.trim() !== '' &&
      this.fileSelector !== null
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileSelector = file;
      this.fileSelectorError = false;
    } else {
      this.fileSelectorError = true;
    }
  }
}
