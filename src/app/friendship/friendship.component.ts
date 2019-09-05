import { Component, OnInit } from '@angular/core';
import { FriendshipService } from '../services/friendship/Friendship.service';
import { UsersService } from '../services/users/users.service';
import { UserDto } from '../services/users/UserDto';

@Component({
  selector: 'app-friendship',
  templateUrl: './friendship.component.html',
  styleUrls: ['./friendship.component.css']
})
export class FriendshipComponent implements OnInit {

  friends: Array<UserDto>;
  invitationsFriends: Array<UserDto>;

  constructor(private friendshipService: FriendshipService, private  usersService: UsersService) {
    this.friends = new Array<UserDto>();
    this.invitationsFriends = new Array<UserDto>();
   }

  ngOnInit() {
    this.friendshipService.GetFriendsList().subscribe(result => {
      if(result.length > 0 ) {
        this.usersService.GetManyUsers(result).subscribe(dtos => {
          this.friends = dtos;
        });
      }
    });

    this.friendshipService.GetInvitations().subscribe(result => {
      if (result.length > 0 ) {
        this.usersService.GetManyUsers(result).subscribe(dtos => {
          this.invitationsFriends = dtos;
        });
      }
    });
  }

}