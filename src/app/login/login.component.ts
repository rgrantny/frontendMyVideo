import { Component, OnInit } from '@angular/core';
import { UserService} from '../service/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  signIn = false;
  object;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  loginUser(username: string, password: string) {
    console.log("login comp.login", username, password);
    this.user.userName = username;
    this.user.password = password;
    this.userService.loginUser(this.user).subscribe(result=>{
      this.object = result;
      this.checkStatus();
      console.log("This object", this.object);
    })
  }

  checkStatus() {
    if(this.object != null) {
      this.signIn = true;      
    } else {
      this.signIn = false;
    }
  }

}
