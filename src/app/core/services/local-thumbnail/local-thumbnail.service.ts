import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VideoDownload } from '../../../models/video-download.model';

@Injectable({
  providedIn: 'root',
})
export class LocalThumbnailService {
  private baseUrl = `${environment.baseUrl}`;
  private apiEndpoint = `${this.baseUrl}/api/videos/thumbnail-status/`;

  constructor(private http: HttpClient) {}

  // getLocalVideos(): Observable<VideoDownload[]> {
  //   return this.http.get<VideoDownload[]>(this.apiEndpoint);
  // }

  checkThumbnailStatus(videoId: number): Observable<any> {
    console.log(
      'Test Check Thumbnail Status funktion url: ',
      `${this.baseUrl}/api/videos/thumbnail-status/${videoId}`
    );

    return this.http.get(
      `${this.baseUrl}/api/videos/thumbnail-status/${videoId}`
    );
  }
}
