import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VideoDownload } from '../../../models/video-download.model'; // Importiere das Video-Interface

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private baseUrl: string = `${environment.baseUrl}/api/videos/`;

  constructor(private http: HttpClient) {}

  getGlobalVideos(): Observable<VideoDownload[]> {
    return this.http.get<VideoDownload[]>(`${this.baseUrl}global-videos/`);
  }

  getLocalVideos(): Observable<VideoDownload[]> {
    return this.http.get<VideoDownload[]>(`${this.baseUrl}local-videos/`);
  }
}
