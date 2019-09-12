import { Component, OnInit } from '@angular/core';
import { UsersAuthService } from '../services/users/usersAuth.service';
import { NgForm } from '@angular/forms';
import { ApiQueryService } from '../services/external/api-query.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { QueryResult } from '../common/QueryResult';

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

  constructor(private usersService: UsersAuthService, private router: Router ) {
    this.loginFailed = false;
    this.logged = false;
   }

  ngOnInit() {
    const identity = ApiQueryService.GetIdentity();
    if (identity === null || identity.length < 1) {
      this.logged = false;
    } else {
      this.logged = true;
    }
  }

  onSubmit(loginFormRef: NgForm) {
  this.usersService.LoginUserSimple(this.login, this.password).subscribe(result=>{
  if (result.length > 0) {
    this.usersService.ApplyLogin(result).subscribe(res=>{
      localStorage.setItem('RANDEVOU_APIKEY', result);
      localStorage.setItem('RANDEVOU_IDENTITY', res.toString());
      loginFormRef.resetForm();
      this.router.navigate(['/myProfile']);
    });
  }
}, error => {
  console.log(error);
});


    // this.usersService.LoginUser(this.login, this.password).subscribe(res=>{

    //   let x = res as Subscription;
    //   let y = res as QueryResult;

    //   });

    //   if(res.isSuccess){
    //   this.logged = true;

    //   loginFormRef.resetForm();
    //   this.router.navigate(['/myProfile']);
    //   }
    // }, (error) => {
    //   ApiQueryService.ClearLoginInfos();
    //   this.loginFailed = true;
    //   console.log(error);
    // });

    //   this.usersService.LoginUser(this.login, this.password).pipe(map(result => {
    //   this.logged = true;

    //   loginFormRef.resetForm();
    //   this.router.navigate(['/myProfile']);
    // }, (error) => {
    //   ApiQueryService.ClearLoginInfos();
    //   this.loginFailed = true;
    //   console.log(error);
    // }));
  }

  logout() {
    this.usersService.LogoutUser();
    this.logged = false;
    this.router.navigate(['/login']);
  }

}
