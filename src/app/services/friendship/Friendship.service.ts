import { Injectable } from '@angular/core';
import { ApiQueryService } from '../external/api-query.service';
import { UserFriendshipExtService } from '../external/UserFriendshipExt.service';
import { Observable } from 'rxjs';
import { FriendhsipSendRequestDto, UpdateFriendshipStatusDto, FriendshipStatusConsts } from './FriendshipRequestsDto';

@Injectable({
  providedIn: 'root'
})

export class FriendshipService {
  constructor(private extService: UserFriendshipExtService) {

  }

  GetFriendsList(): Observable<Array<number>> {
    const userId = ApiQueryService.GetIdentity();
    return this.extService.GetFriends(+userId);
  }

  SendInvitation(usrId: number) {
    const loggedUserId = ApiQueryService.GetIdentity();
    const dto: FriendhsipSendRequestDto = { fromUserId: +loggedUserId, toUserId:  usrId };
    return this.extService.PostFriendshipInvitation(dto);
  }

  AcceptInvitation(usrId: number) {
    const loggedUserId = ApiQueryService.GetIdentity();
    const dto: UpdateFriendshipStatusDto = { fromUserId: +loggedUserId, toUserId: usrId, action: FriendshipStatusConsts.Accept };
    return this.extService.SetFriendshipStatusAction(dto);
  }

  DeclineInvitation(usrId: number){
    const loggedUserId = ApiQueryService.GetIdentity();
    const dto: UpdateFriendshipStatusDto = { fromUserId: +loggedUserId, toUserId: usrId, action: FriendshipStatusConsts.Delete };
    return this.extService.SetFriendshipStatusAction(dto);
  }

  GetInvitations() {
    const loggedUserId = ApiQueryService.GetIdentity();
    return this.extService.GetFriendshipRequests(+loggedUserId);
  }

}
