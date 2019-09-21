import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendshipService } from '../services/friendship/Friendship.service';
import { UsersService } from '../services/users/users.service';
import { UserDto } from '../services/users/UserDto';
import { ApiQueryService } from '../services/external/api-query.service';

@Component({
  selector: 'app-user-details-short',
  templateUrl: './user-details-short.component.html',
  styleUrls: ['./user-details-short.component.css']
})
export class UserDetailsShortComponent implements OnInit {

  @Input() userId: number;

  avatarBase64Str: string;
  shortDto: UserDto;
  canSendInvitation: boolean;

  constructor(private route: ActivatedRoute, private router: Router,
              private usersService: UsersService, private friendshipService: FriendshipService) {
                const identity = ApiQueryService.GetIdentity();
                if (identity === undefined || identity === null || identity.length < 1) {
                  this.router.navigate(['/login']);
                  }

               }

  ngOnInit() {
    this.getMyProfileData();

  }

  getMyProfileData() {
    this.usersService.GetUserBasic(this.userId.toString()).subscribe(result => {
      this.shortDto = result;
      this.friendshipService.CanSendInvitationToFriend(+this.userId).subscribe(qResult => {
        this.canSendInvitation = qResult;
      });
      const myIdAsArray: number[] = [+this.userId];
      this.usersService.GetUsersAvatars(myIdAsArray).subscribe(avatar => {
        if (avatar[0] !== undefined && avatar[0].base64Content !== undefined) {
          this.avatarBase64Str = `data:${avatar[0].contentType};base64,${avatar[0].base64Content}`;
        }
      });
    }, (error) => {
      console.log(error);
    });
  }

  gotoProfile(userId: number) {
    this.router.navigate(['/user/' + userId]);
   }
}
