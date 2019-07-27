import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users/users.service';
import { UserCreateDto } from '../services/users/UserDto';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  registerDto: UserCreateDto;

  constructor(private usersService: UsersService) {
    this.registerDto = {
    };
    this.registerDto.userDto = { };
  }


  ngOnInit() {
  }

  onSubmit(contactFormRef: NgForm) {
    this.usersService.CreateUser(this.registerDto);
    contactFormRef.reset();
  }
}
