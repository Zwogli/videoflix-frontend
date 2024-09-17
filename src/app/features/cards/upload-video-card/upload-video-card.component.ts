import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { VideoUpload } from 'src/app/models/video-upload.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-video-card',
  templateUrl: './upload-video-card.component.html',
  styleUrls: ['./upload-video-card.component.scss'],
})
export class UploadVideoCardComponent {
  title: string = '';
  description: string = '';

  titleError: boolean = false;
  descriptionError: boolean = false;
  fileSelectorError: boolean = false;
  loading: boolean = false;

  fileSelector: File | null = null;

  constructor(private httpService: HttpService, private router: Router) {}

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
      !!this.fileSelector
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
      console.log('File selected:', file);
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

  postLocalVideo(formData: FormData) {
    // console.log(formData);

    this.httpService
      .postFile<VideoUpload>('api/videos/upload/', formData)
      .subscribe({
        next: (response) => {
          // console.log('Video hochgeladen:', response);
          this.loading = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Fehler beim Hochladen:', error);
          this.loading = false;
        },
      });
  }
}
