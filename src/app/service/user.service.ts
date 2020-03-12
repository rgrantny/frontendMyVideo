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
    console.log("user service login", loginUser);
    const url = this.BASE_URL+"/login";
    return this.httpClient.post(url,loginUser).pipe(catchError(this.handleError));
  }

  addUser(addedUser:User) {
    throw new Error("Method not implemented.");
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: "Invalid Username/Password"`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getUser() {
    const url = this.BASE_URL+"/";
    return this.httpClient.get(url).pipe(retry(3),catchError(this.handleError)); 
  }

  constructor(private httpClient: HttpClient) { }
}

