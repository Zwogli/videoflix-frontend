import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Video } from '../../../models/video.models';  // Importiere das Video-Interface

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private baseUrl: string = `${environment.baseUrl}/api/videos/`;

  constructor(private http: HttpClient) {}

  getGlobalVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}global-videos/`);
  }

  getLocalVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseUrl}local-videos/`);
  }
}
