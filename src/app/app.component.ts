import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Video Repo';
  signedIn = true;
  constructor(private router: Router){}
  
  logout() {
    this.signedIn = false;
    this.router.navigate(["/logout"]);
  }
}