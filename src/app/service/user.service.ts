import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError} from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = 'http://localhost:8080/user';
  user: User;

  loginUser(loginUser: User){
    const url = this.BASE_URL+"/login";
    this.httpClient.post(url,loginUser).pipe(catchError(this.handleError));
  }

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

  public getUser() {
    const url = this.BASE_URL+"/";
    return this.httpClient.get(url).pipe(retry(3),catchError(this.handleError)); 
  }

  public loginRequest(user: User) {
    const url = this.BASE_URL+"/{id}"
    // const options = { params: new HttpParams({fromObject:User})};
    return this.httpClient.post(url, user).pipe(retry(3),
    catchError(this.handleError));
  }

  constructor(private httpClient: HttpClient) { }
}
