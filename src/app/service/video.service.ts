import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError} from 'rxjs';
import { retry, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private BASE_URL = 'http://localhost:8080/video';

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

  constructor(private httpClient: HttpClient) { }
}
