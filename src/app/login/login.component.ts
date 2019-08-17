import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from '../services/users/usersAuth.service';
import { NgForm } from '@angular/forms';

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
  }

  onSubmit(registerFormRef: NgForm) {
      this.usersService.LoginUser(this.login, this.password).subscribe(result => {
      this.logged = true;

      registerFormRef.resetForm();


      //set cookie auth:result...
      sessionStorage.setItem('','');

    }, (error) => {
      this.loginFailed = true;
      console.log(error);
    });
  }

  logout() {
    this.usersService.LogoutUser();
    this.logged = false;
  }

}
