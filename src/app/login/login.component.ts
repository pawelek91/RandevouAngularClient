import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from '../services/users/usersAuth.service';
import { NgForm } from '@angular/forms';
import { ApiQueryService } from '../services/external/api-query.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;
  loginFailed: boolean;
  logged: boolean;

  constructor(private usersService: UsersAuthService) {
    this.loginFailed = false;
   }

  ngOnInit() {
    const identity = ApiQueryService.GetIdentity();
    if (identity.length < 1) {
      this.logged = false;
    } else {
      this.logged = true;
    }
  }

  onSubmit(loginFormRef: NgForm) {
      this.usersService.LoginUser(this.login, this.password).subscribe(result => {
      this.logged = true;

      loginFormRef.resetForm();
    }, (error) => {
      ApiQueryService.ClearLoginInfos();
      this.loginFailed = true;
      console.log(error);
    });
  }

  logout() {
    this.usersService.LogoutUser();
    this.logged = false;
  }

}
