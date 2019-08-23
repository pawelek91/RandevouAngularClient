import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDto, UserFullDto } from '../services/users/UserDto';
import { UsersService } from '../services/UsersService';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  userDto: UserFullDto;
  newPassword: string;
  newBirthDate: NgbDate;

  constructor(private usersService: UsersService) {
    this.userDto = {
      basic : {},
      details : {},
    };
    this.usersService.GetUserBasic().subscribe(result => {
      this.userDto.basic = result;
      const date = new Date(this.userDto.basic.birthDate);

      this.newBirthDate = new NgbDate(date.getFullYear(),date.getMonth(),date.getDay() );

    }, (error) => {
      console.log(error);
    });

    this.usersService.GetUserWithDetails().subscribe(result => {
      this.userDto.details = result;
    }, (error) => {
      console.log(error);
    });

   }

  ngOnInit() {
  }

  onSubmit(myProfileFormRef: NgForm) {

  }

  onChangePassword(changePasswordFormRef: NgForm) {

  }

}
