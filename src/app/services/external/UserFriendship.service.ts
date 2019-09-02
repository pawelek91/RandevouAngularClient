import { ApiQueryService } from './api-query.service';



export class UserFriendshipService extends ApiQueryService {
  FriendshipQueryEndpoint = 'api/UserFriendship';
  GetFriendsList = this.FriendshipQueryEndpoint + '/users/{id}/friends';
  GetFriendshipisRequests = this.FriendshipQueryEndpoint + '/users/{id}/requests';
  GetPossibleAction = this.FriendshipQueryEndpoint + '/PossibleRequestsActions';
  SendInvitation = this.FriendshipQueryEndpoint + '/Invitation';
  SetFriendshipStatus = this.FriendshipQueryEndpoint + '/FriendshipStatusAction';

  constructor() {
    super();
  }
}
