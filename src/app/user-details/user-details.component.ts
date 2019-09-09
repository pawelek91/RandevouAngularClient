import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { Observable } from 'rxjs';
import { UsersDetailsDto, UserFullDto } from '../services/users/UserDto';
import { DictionaryItemDto } from '../common/DictionaryItemDto';
import { ActivatedRoute } from '@angular/router';
import { FriendshipService } from '../services/friendship/Friendship.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  interestsDict: Array<DictionaryItemDto>;
  identity: string;
  userDto: UserFullDto;
  avatarBase64Str: string;
  userEyesColor: string;
  userHairColor: string;
  userInterests: Array<string>;
  addFriendResult: string;
  canSendInvitation: boolean;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private friendshipService: FriendshipService) {
    this.userDto = {
      basic : {},
      details : { },
    };

    this.userInterests = new Array<string>();
  }

  ngOnInit() {
    this.identity = this.route.snapshot.paramMap.get('id');
    this.getDictionariesData();
    this.getMyProfileData();
  }

  getDictionariesData() {
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
      this.friendshipService.CanSendInvitationToFriend(+this.identity).subscribe(qResult => {
        this.canSendInvitation = qResult;
      });

    }, (error) => {
      console.log(error);
    });

    this.usersService.GetUserWithDetails(this.identity).subscribe(result => {
      this.userDto.details = result;
      this.userDto.details.id = this.userDto.basic.id;

      if (this.userDto.details.eyesColor !== undefined) {
        this.usersService.GetEyesColorsDictionary().subscribe( ecd => {
          this.userEyesColor = ecd.find(x => x.id === this.userDto.details.eyesColor).displayName;
        });
      }


      if (this.userDto.details.hairColor !== undefined) {
        this.usersService.GetHairColorsDictionary().subscribe( hcd => {
          this.userHairColor = hcd.find(x => x.id === this.userDto.details.hairColor).displayName;
        });
      }

      if (this.userDto.details.interests !== undefined && this.userDto.details.interests.length > 0) {
        this.usersService.GetInterestsDictionary().subscribe(interest => {
          interest.forEach( int => {
            if (this.userDto.details.interests.some(x => x === int.id)) {
              this.userInterests.push(int.displayName);
            }
          });
        });
      }

      const myIdAsArray: number[] = [+this.identity];
      this.usersService.GetUsersAvatars(myIdAsArray).subscribe(avatar => {
        if (avatar[0] !== undefined && avatar[0].base64Content !== undefined) {
          this.avatarBase64Str = `data:${avatar[0].contentType};base64,${avatar[0].base64Content}`;
        }
      });
    }, (error) => {
      console.log(error);
    });
  }

  SendFriendshipInvitation(id: number) {
    this.friendshipService.SendInvitation(id).subscribe(result => {
      this.addFriendResult = 'Wysłano zaproszenie';
      this.canSendInvitation = false;
    }, error => {
      this.addFriendResult = 'Nie udało się wysłać zaproszenia';
    });
  }
}
