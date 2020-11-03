import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loginbtn: boolean;
  logoutbtn: boolean;

  constructor(private loginService: LoginService) {
    loginService.getLoggedInName.subscribe(name => this.changeName(name));
    if (this.loginService.isLoggedIn()) {
      console.log("loggedin");
      this.loginbtn = false;
      this.logoutbtn = true
    }
    else {
      this.loginbtn = true;
      this.logoutbtn = false
    }

  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }
  
  logout() {
    this.loginService.deleteToken();
    window.location.href = window.location.href;
  }
}