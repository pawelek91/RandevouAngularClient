import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersAuthService } from '../services/users/usersAuth.service';
import { UserCreateDto } from '../services/users/UserDto';
import { take, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  registerDto: UserCreateDto;
  userRegistrationFailed = false;

  constructor(private usersService: UsersAuthService, private router: Router) {
    this.registerDto = {
    };
    this.registerDto.userDto = { };
  }


  ngOnInit() {
  }

  onSubmit(registerFormRef: NgForm) {
    const queryResult = this.usersService.CreateUser(this.registerDto)
    .subscribe(result => {
      if (result.isSuccess) {
        this.userRegistered(registerFormRef);
        this.userRegistrationFailed = false;
        this.router.navigate(['/login']);
        } else {
            this.userRegistrationFailed = true;
          }
    }, (error) => {
      console.log(error);
      this.userRegistrationFailed = true;
    });
  }

  userRegistered(contactFormRef: NgForm) {
    contactFormRef.reset();
  }


}
