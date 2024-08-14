import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VideoUpload } from 'src/app/models/video-upload.model';

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

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (!this.isFormValid) {
      this.errorManager();
    }

    this.loading = true;
    const videoData: VideoUpload = this.getVideoUploadPayload();
    const formData = this.createFormData(videoData);
    this.postLocalVideo(formData);
  }

  get isFormValid(): boolean {
    return (
      this.title.trim() !== '' &&
      this.description.trim() !== '' &&
      this.fileSelector !== null
    );
  }

  errorManager() {
    this.titleError = this.title.trim() === '';
    this.descriptionError = this.description.trim() === '';
    this.fileSelectorError = this.fileSelector === null;
    return;
  }

  getVideoUploadPayload() {
    return {
      title: this.title,
      description: this.description,
      file: this.fileSelector as File,
    };
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

  private createFormData(videoData: VideoUpload): FormData {
    const formData = new FormData();
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);
    formData.append('file', videoData.file);

    return formData;
  }

  postLocalVideo(formData: FormData){
    this.http.post<VideoUpload>('/api/videos/upload/', formData).subscribe({
      next: (response) => {
        console.log('Video hochgeladen:', response);
        // response ist vom Typ Video, mit file als string (URL oder Pfad)
        this.loading = false;
      },
      error: (error) => {
        console.error('Fehler beim Hochladen:', error);
        this.loading = false;
      },
    });
  }
}
