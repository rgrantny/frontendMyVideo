import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { throwError, Observable} from 'rxjs';
import { retry, catchError, tap} from 'rxjs/operators';
import { Video } from '../model/video';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private BASE_URL = 'http://localhost:8080/video';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getVideos() {
    const url = this.BASE_URL+"/";
    return this.httpClient.get(url).pipe(retry(3),catchError(this.handleError)); 
  }
  deleteVideo (video: Video | number): Observable<Video> {
    if( typeof video === 'number') {
      return this._deleteVideo(video);
    } else {
      return this.__deleteVideo(video);
    }
  }
  
  _deleteVideo (id:  number): Observable<Video> {
    const url = `${this.BASE_URL}/${id}`;
    console.log("deleteVideo:" , url);
  
    return this.httpClient.delete<Video>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted video id=${id}`)),
      catchError(this.handleError)
    );
  }
  
  __deleteVideo (video: Video): Observable<Video> {
    return this._deleteVideo(video.videoId);
  }

/** POST: add a new video to the server */
addVideo (video: Video): Observable<Video> {
  const url = this.BASE_URL+"/";
  return this.httpClient.post<Video>(url, video, this.httpOptions).pipe(
    tap((newVideo: Video) => console.log(`added video w/ id=${newVideo.videoId}`)),
    catchError(this.handleError));
}

  constructor(private httpClient: HttpClient, private router: Router){}
}
