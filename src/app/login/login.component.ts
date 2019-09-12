import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from '../services/users/usersAuth.service';
import { NgForm } from '@angular/forms';
import { ApiQueryService } from '../services/external/api-query.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { QueryResult } from '../common/QueryResult';
import { NavbarService } from '../services/navbar.service';

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

  constructor(private usersService: UsersAuthService, private router: Router, public navbar: NavbarService ) {
    this.loginFailed = false;
    this.logged = false;
    this.navbar.show();
   }

  ngOnInit() {
    const identity = ApiQueryService.GetIdentity();
    if (identity === null || identity.length < 1) {
      this.logged = false;
    } else {
      this.logged = true;
    }

    if (this.logged){
      this.router.navigate(['/myProfile']);
    }
  }

  onSubmit(loginFormRef: NgForm) {
  this.usersService.LoginUserSimple(this.login, this.password).subscribe(result=>{
  if (result.length > 0) {
    this.usersService.ApplyLogin(result).subscribe(res=>{
      localStorage.setItem('RANDEVOU_APIKEY', result);
      localStorage.setItem('RANDEVOU_IDENTITY', res.toString());
      loginFormRef.resetForm();
      window.location.reload();
    });
  }
}, error => {
  console.log(error);
});
}

  logout() {
    this.usersService.LogoutUser();
    this.logged = false;
    this.router.navigate(['/login']);
  }

}
