import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollingService {
  private baseUrl = `${environment.baseUrl}`;
  private apiEndpoint = `${this.baseUrl}/api/videos`;

  constructor(private http: HttpClient) { }

  checkThumbnailStatus(videoId: number): Observable<{ thumbnail_created: boolean; thumbnail: string }> {
    return this.http.get<{ thumbnail_created: boolean; thumbnail: string }>(
      `${this.apiEndpoint}/thumbnail-status-test/${videoId}/`
    );
  }
}
