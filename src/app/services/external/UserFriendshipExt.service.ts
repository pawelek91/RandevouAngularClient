import { ApiQueryService } from './api-query.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FriendhsipSendRequestDto, UpdateFriendshipStatusDto } from '../friendship/FriendshipRequestsDto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserFriendshipExtService extends ApiQueryService {
  FriendshipQueryEndpoint =  ApiQueryService.ApiEndpoint + '/api/UserFriendship';
  GetFriendsListEnd = this.FriendshipQueryEndpoint + '/users/{id}/friends';
  GetFriendshipisRequestsEnd = this.FriendshipQueryEndpoint + '/users/{id}/requests';
  GetPossibleActionEnd = this.FriendshipQueryEndpoint + '/PossibleRequestsActions';
  SendInvitationEnd = this.FriendshipQueryEndpoint + '/Invitation';
  SetFriendshipStatusEnd = this.FriendshipQueryEndpoint + '/FriendshipStatusAction';
  GetFriendshipStatusNend = this.FriendshipQueryEndpoint + '/users/{id}/RelationStatus/';
  constructor(private client: HttpClient) {
    super();
  }

  GetFriends(id: number) {
    const apiKey = this.GetApiKey();
    let addHeaders = new HttpHeaders();
    addHeaders = addHeaders.append('Authorization', apiKey);
    const endpoint = this.BuildAddress(this.GetFriendsListEnd, id);
    return this.client.get<Array<number>>(endpoint, {headers: addHeaders});
  }

  GetFriendshipRequests(id: number) {
    const apiKey = this.GetApiKey();
    let addHeaders = new HttpHeaders();
    addHeaders = addHeaders.append('Authorization', apiKey);
    const endpoint = this.BuildAddress(this.GetFriendshipisRequestsEnd, id);
    return this.client.get<Array<number>>(endpoint, {headers: addHeaders});
  }

  PostFriendshipInvitation(dto: FriendhsipSendRequestDto) {
    const apiKey = this.GetApiKey();
    let addHeaders = new HttpHeaders();
    addHeaders = addHeaders.append('Authorization', apiKey);
    const endpoint = this.BuildAddress(this.SendInvitationEnd);
    return this.client.put(endpoint, dto, {headers: addHeaders, observe: 'response'});
  }

  SetFriendshipStatusAction(dto: UpdateFriendshipStatusDto) {
    const apiKey = this.GetApiKey();
    let addHeaders = new HttpHeaders();
    addHeaders = addHeaders.append('Authorization', apiKey);
    const endpoint = this.BuildAddress(this.SetFriendshipStatusEnd);
    return this.client.put(endpoint, dto, {headers: addHeaders, observe: 'response'});
  }

  GetFriendshipStatus(user1Id: number, user2Id: number) {
    const apiKey = this.GetApiKey();
    let endp = this.BuildAddress(this.GetFriendshipStatusNend, user1Id);
    endp += user2Id;
    let addHeaders = new HttpHeaders();
    addHeaders = addHeaders.append('Authorization', apiKey);
    return this.client.get<string>(endp, {headers: addHeaders, responseType: 'text' as 'json'});
  }
}
