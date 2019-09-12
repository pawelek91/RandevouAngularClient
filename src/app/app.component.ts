import { Component, OnInit } from '@angular/core';
import { ApiQueryService } from './services/external/api-query.service';
import { UsersAuthService } from './services/users/usersAuth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RandevouAngularClient';
  public logged: boolean;
  constructor(private usersService: UsersAuthService, private router: Router) {

  }

  ngOnInit() {
    const identity = ApiQueryService.GetIdentity();
    if (identity === null || identity.length < 1) {
      this.logged = false;
    } else {
      this.logged = true;
    }
  }

  logout() {
    this.usersService.LogoutUser();
    this.logged = false;
    //this.router.navigate(['/login']);
  }
}
