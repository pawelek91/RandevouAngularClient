import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from '../services/users/usersAuth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;
  loginFailed: boolean;

  constructor(private usersService: UsersAuthService) {
    this.loginFailed = false;
   }

  ngOnInit() {
  }

  onSubmit() {
    this.usersService.LoginUser(this.login, this.password).subscribe(result => {
      //set cookie auth:result...

    }, (error) => {
      this.loginFailed = true;
      console.log(error);
    });
  }

}
