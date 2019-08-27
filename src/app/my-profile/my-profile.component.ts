import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDto, UserFullDto } from '../services/users/UserDto';
import { UsersService } from '../services/UsersService';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DictionaryItemDto } from '../common/DictionaryItemDto';
import { Observable } from 'rxjs';
import { ApiQueryService } from '../services/external/api-query.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  updateNotSucceded: boolean;
  userDto: UserFullDto;
  newPassword: string;
  newBirthDate: NgbDate;

  hairColorsDict: Array<DictionaryItemDto>;
  eyesColorsDict: Array<DictionaryItemDto>;
  interestsDict: Array<DictionaryItemDto>;

  constructor(private usersService: UsersService) {
    this.userDto = {
      basic : {},
      details : { },
    };

    this.hairColorsDict = new Array<DictionaryItemDto>();
    this.eyesColorsDict = new Array<DictionaryItemDto>();
    this.interestsDict = new Array<DictionaryItemDto>();




    this.getDictionariesData();
    this.getMyProfileData();


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
      this.interestsDict.forEach(x => {
        x.boolValue = false;
      });
    });
  }

  getMyProfileData() {
    const id = ApiQueryService.GetIdentity();

    this.usersService.GetUserBasic(id).subscribe(result => {
      this.userDto.basic = result;
      const date = new Date(this.userDto.basic.birthDate);

      this.newBirthDate = new NgbDate(date.getFullYear(), date.getMonth(), date.getDay() );

    }, (error) => {
      console.log(error);
    });

    this.usersService.GetUserWithDetails(id).subscribe(result => {
      this.userDto.details = result;
      this.userDto.details.id = this.userDto.basic.id;
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

    if (this.userDto.details.interests != null) {
      this.userDto.details.dictionaryValues.interest =
      this.interestsDict.filter(x => this.userDto.details.interests.some(y => y === x.id));

      this.interestsDict.forEach(element => {
        if (this.userDto.details.interests.some(x => x === element.id)) {
         // element.boolValue = true;
        }
      });
    }
  }
  onSubmit(myProfileFormRef: NgForm) {
    const birthDate = myProfileFormRef.value['dp'] as NgbDate;
    this.userDto.basic.birthDate = new Date(birthDate.year, birthDate.month, birthDate.day).toJSON();

    const checkedInterestsIds = this.interestsDict.filter(x => x.boolValue).map(x => x.id);
    this.userDto.details.interests = checkedInterestsIds;
    this.usersService.PatchUserData(this.userDto).subscribe(result => {
      if (!result.isSuccess) {
        console.log('error: ' + result.message);
      }
    }, (error) => {
      console.log(error);
    });
  }

  onChangePassword(changePasswordFormRef: NgForm) {

  }

}
