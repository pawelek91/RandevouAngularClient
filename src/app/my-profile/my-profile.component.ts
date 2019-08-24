import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDto, UserFullDto } from '../services/users/UserDto';
import { UsersService } from '../services/UsersService';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DictionaryItemDto } from '../common/DictionaryItemDto';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  userDto: UserFullDto;
  newPassword: string;
  newBirthDate: NgbDate;

  hairColorsDict: DictionaryItemDto[];
  eyesColorsDict: DictionaryItemDto[];
  interestsDict: DictionaryItemDto[];

  constructor(private usersService: UsersService) {
    this.userDto = {
      basic : {},
      details : { },
    };
    this.getMyProfileData();
    this.getDictionariesData();
   }

  ngOnInit() {
    this.fillUserDetailsDictionary();
  }

  getDictionariesData() {
    this.usersService.GetEyesColorsDictionary().subscribe(result => {
      this.eyesColorsDict = result;
    });

    this.usersService.GetHairColorsDictionary().subscribe(result => {
      this.hairColorsDict = result;
    });

    this.usersService.GetInterestsDictionary().subscribe(result => {
      this.interestsDict = result;
    });
  }

  getMyProfileData() {
    this.usersService.GetUserBasic().subscribe(result => {
      this.userDto.basic = result;
      const date = new Date(this.userDto.basic.birthDate);

      this.newBirthDate = new NgbDate(date.getFullYear(), date.getMonth(), date.getDay() );

    }, (error) => {
      console.log(error);
    });

    this.usersService.GetUserWithDetails().subscribe(result => {
      this.userDto.details = result;
    }, (error) => {
      console.log(error);
    });
  }
  fillUserDetailsDictionary() {
    this.userDto.details.dictionaryValues = {
    };

    if (this.userDto.details.eyesColor != null && typeof(this.userDto.details.eyesColor) !== undefined) {
      this.userDto.details.dictionaryValues.eyesColor =
      this.eyesColorsDict.find(x => x.id === this.userDto.details.eyesColor);
    }

    if (this.userDto.details.hairColor != null && typeof(this.userDto.details.hairColor) !== undefined) {
      this.userDto.details.dictionaryValues.hairColor =
      this.hairColorsDict.find(x => x.id === this.userDto.details.hairColor);
    }

    if (this.userDto.details.interes != null) {
      this.userDto.details.dictionaryValues.interest =
      this.interestsDict.filter(x => this.userDto.details.interes.some(y => y === x.id));
    }
  }
  onSubmit(myProfileFormRef: NgForm) {

  }

  onChangePassword(changePasswordFormRef: NgForm) {

  }

}
