import { Component, OnInit } from '@angular/core';
import { ApiQueryService } from './services/external/api-query.service';
import { UsersAuthService } from './services/users/usersAuth.service';
import { Router } from '@angular/router';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RandevouAngularClient';
  public logged: boolean;
  constructor(private usersService: UsersAuthService, private router: Router, public navbar: NavbarService) {
    let x = 5;
  }

  ngOnInit() {
    this.navbar.show();
    // const identity = ApiQueryService.GetIdentity();
    // if (identity === null || identity.length < 1) {
    //   this.logged = false;
    // } else {
    //   this.logged = true;
    // }
  }

  logout() {
    this.usersService.LogoutUser();
    this.logged = false;
    window.location.reload();
  }
}
