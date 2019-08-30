import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDto, UserFullDto } from '../services/users/UserDto';
import { UsersService } from '../services/users/users.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DictionaryItemDto } from '../common/DictionaryItemDto';
import { Observable, fromEvent } from 'rxjs';
import { ApiQueryService } from '../services/external/api-query.service';
import { Router } from '@angular/router';
import { pluck } from 'rxjs/operators';

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
  identity: string;
  myProfileAvatar: string;

  hairColorsDict: Array<DictionaryItemDto>;
  eyesColorsDict: Array<DictionaryItemDto>;
  interestsDict: Array<DictionaryItemDto>;

  constructor(private usersService: UsersService, router: Router) {
    this.identity = ApiQueryService.GetIdentity();

    if (this.identity.length < 1) {
      router.navigate(['/login']);
    } else {

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
    this.usersService.GetUserBasic(this.identity).subscribe(result => {
      this.userDto.basic = result;
      const date = new Date(this.userDto.basic.birthDate);

      this.newBirthDate = new NgbDate(date.getFullYear(), date.getMonth(), date.getDay() );

    }, (error) => {
      console.log(error);
    });

    this.usersService.GetUserWithDetails(this.identity).subscribe(result => {
      this.userDto.details = result;
      this.userDto.details.id = this.userDto.basic.id;

      this.interestsDict.forEach(element => {
        if (this.userDto.details.interests.some(x => x === element.id)) {
         element.boolValue = true;
        }
      });
      this.usersService.GetUsersAvatars(new Array<number>() [ this.identity ]).subscribe(avatar => {
        if (avatar[0] !== undefined && avatar[0].base64Content !== undefined) {
          this.myProfileAvatar = `data:${avatar[0].contentType};base64,${avatar[0].base64Content}`;
        }
      });
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
         element.boolValue = true;
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
      if (result !== null && !result.isSuccess) {
        console.log('error: ' + result.message);
      }
    }, (error) => {
      console.log(error);
    });
  }

  onChangePassword(changePasswordFormRef: NgForm) {

  }

  processFile(imageInput: any) {
    if(imageInput === undefined || imageInput.files === undefined) {
      return;
    }
    const avatarFile: File = imageInput.files[0];
    if(avatarFile === null) {
      return;
    }
    const reader = new FileReader();
    const contetType = avatarFile.type;
    this.imageToBase64(reader, avatarFile).subscribe( base64Str => {
      this.usersService.SetAvatar(this.identity, base64Str, contetType).subscribe(result => {
      }, error => {
        console.log(error);
      });
    });
  }

  imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
    fileReader.readAsDataURL(fileToRead);
    return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
  }



}
