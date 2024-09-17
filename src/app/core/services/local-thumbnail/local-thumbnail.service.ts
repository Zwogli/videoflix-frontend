import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalThumbnailService {
  private baseUrl = `${environment.baseUrl}`;

  constructor(private http: HttpClient) {}

  checkThumbnailStatus(videoId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/videos/thumbnail-status/${videoId}`);
  }
}
