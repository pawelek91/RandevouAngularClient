import { Component, OnInit } from '@angular/core';
import { FriendshipService } from '../services/friendship/Friendship.service';
import { UsersService } from '../services/users/users.service';
import { UserDto } from '../services/users/UserDto';
import { Router } from '@angular/router';
import { ApiQueryService } from '../services/external/api-query.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-friendship',
  templateUrl: './friendship.component.html',
  styleUrls: ['./friendship.component.css']
})
export class FriendshipComponent implements OnInit {

  friends: Array<UserDto>;
  invitationsFriends: Array<UserDto>;

  constructor(private friendshipService: FriendshipService, private  usersService: UsersService,
              private router: Router, public nav: NavbarService) {
    this.friends = new Array<UserDto>();
    this.invitationsFriends = new Array<UserDto>();
    this.nav.show();
    const identity = ApiQueryService.GetIdentity();
    if (identity.length < 1) {
      router.navigate(['/login']);
    }


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

  acceptFriendship(id: number) {
    this.friendshipService.AcceptInvitation(id)
    .subscribe(result => {

      if (!result.ok || result.status !== 200) {
        throw Error;
      }

      const addedFriend = this.invitationsFriends.find(x => x.id === id);
      this.friends.push(addedFriend);
      this.invitationsFriends = this.invitationsFriends.filter(x => x.id !== id);
    }, error => {

    });
  }

  deleteFriend(id: number) {
    this.friendshipService.DeclineInvitation(id).subscribe(result => {

      if (!result.ok || result.status !== 200) {
        throw Error;
      }

      this.friends = this.friends.filter(x => x.id !== id);
    }, error => {

    });
  }

  denyFriendship(id: number) {
    this.friendshipService.DeclineInvitation(id).subscribe(result => {

      if (!result.ok || result.status !== 200) {
        throw Error;
      }

      this.invitationsFriends = this.invitationsFriends.filter(x => x.id !== id);
    }, error => {

    });
  }

  goToConversation(id: number) {
    this.router.navigate(['/messages/' + id]);
  }

  goToProfile(id: number) {
    this.router.navigate(['/user/' + id]);
  }

}
