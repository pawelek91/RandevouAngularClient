import { ApiQueryService } from './api-query.service';
import { UserDto, UsersDetailsDto } from '../users/UserDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsersQueryExternalService extends ApiQueryService {
  private UsersEnd = ApiQueryService.ApiEndpoint + '/api/Users';
  private GetAllUsersEnd = this.UsersEnd;
  private GetManyUsersEnd = this.UsersEnd + '/List';
  private GetUserEnd = this.UsersEnd + '/{id}';
  private PatchUserEnd = this.UsersEnd;
  private DeleteUserEnd = this.UsersEnd + '/{id}';
  private PostUserEnd = this.UsersEnd;

  private GetUserDetailsEnd = this.GetUser + '/Details';
  private PutUserDetailsEnd = this.PatchUserEnd + '/{id}/Details';
  private PutAvatar = this.PatchUserEnd + '/{id}/Details/avatar';

  private GetUsersAvatars = this.GetManyUsersEnd + '/Avatars';

  constructor(private client: HttpClient) {
    super();

  }
  GetUser(id: number): Observable<UserDto> {
    const apiKey = this.GetApiKey();
    let addHeaders = new HttpHeaders();
    addHeaders = addHeaders.append('Authorization', apiKey);

    const endpoint = this.BuildAddress(this.GetUserEnd, id);
    return this.client.get<UserDto>(endpoint, {headers: addHeaders}).pipe(map(result => {
      return result;
    }));
  }

  GetUserDetails(id: number): Observable<UsersDetailsDto> {
    const apiKey = this.GetApiKey();
    let addHeaders = new HttpHeaders();
    addHeaders = addHeaders.append('Authorization', apiKey);

    const endpoint = this.BuildAddress(this.GetUserDetailsEnd, id);
    return this.client.get<UsersDetailsDto>(endpoint, {headers: addHeaders}).pipe(map(result => {
      return result;
    }));
  }
}
