import { Component } from '@angular/core';

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

  onSubmit() {}
}
