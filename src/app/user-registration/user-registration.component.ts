import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users/users.service';
import { UserCreateDto } from '../services/users/UserDto';
import { take, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  registerDto: UserCreateDto;
  userRegistrationFailed = false;

  constructor(private usersService: UsersService) {
    this.registerDto = {
    };
    this.registerDto.userDto = { };
  }


  ngOnInit() {
  }

  onSubmit(contactFormRef: NgForm) {
    const queryResult = this.usersService.CreateUser(this.registerDto)
    .subscribe(result => {
      if (result.isSuccess) {
        this.userRegistered(contactFormRef);
        this.userRegistrationFailed = false;
        // redirect to login
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
