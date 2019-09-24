import { ApiQueryService } from './api-query.service';
import { UserDto, UsersDetailsDto, UserAvatarDto } from '../users/UserDto';
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

  private GetUserDetailsEnd = this.GetUserEnd + '/Details';
  private PutUserDetailsEnd = this.PatchUserEnd + '/{id}/Details';
  private PutAvatar = this.PatchUserEnd + '/{id}/Details/avatar';
  private PutAvatarBase64 = this.PutAvatar + '/base64';
  private GetUsersAvatars = this.GetManyUsersEnd + '/Avatars/base64img';

  constructor(client: HttpClient) {
    super(client);

  }

  GetUser(id: number): Observable<UserDto> {
    const endpoint = this.BuildAddress(this.GetUserEnd, id);
    return this.Get<UserDto>(endpoint);
  }

  // GetUser(id: number): Observable<UserDto> {
  //   const apiKey = this.GetApiKey();
  //   let addHeaders = new HttpHeaders();
  //   addHeaders = addHeaders.append('Authorization', apiKey);

  //   const endpoint = this.BuildAddress(this.GetUserEnd, id);
  //   return this.client.get<UserDto>(endpoint, {headers: addHeaders}).pipe(map(result => {
  //     return result;
  //   }));
  // }

  GetUserDetails(id: number): Observable<UsersDetailsDto> {
    const endpoint = this.BuildAddress(this.GetUserDetailsEnd, id);
    return this.Get<UsersDetailsDto>(endpoint);
  }

  // GetUserDetails(id: number): Observable<UsersDetailsDto> {
  //   const apiKey = this.GetApiKey();
  //   let addHeaders = new HttpHeaders();
  //   addHeaders = addHeaders.append('Authorization', apiKey);

  //   const endpoint = this.BuildAddress(this.GetUserDetailsEnd, id);
  //   return this.client.get<UsersDetailsDto>(endpoint, {headers: addHeaders}).pipe(map(result => {
  //     return result;
  //   }));
  // }
  PatchUserBasicData(dto: UserDto) {
    const endpoint = this.BuildAddress(this.PatchUserEnd);
    return this.Patch(endpoint, dto);
  }

  // PatchUserBasicData(id: number, dto: UserDto) {
  //   const apiKey = this.GetApiKey();
  //   let addHeaders = new HttpHeaders();
  //   addHeaders = addHeaders.append('Authorization', apiKey);

  //   const endpoint = this.BuildAddress(this.PatchUserEnd);
  //   return this.client.patch(endpoint, dto, {observe: 'response', headers: addHeaders} )
  //   .pipe(map(response => {
  //     if (response.ok) {
  //     return true;
  //     } else { return false; }
  //   }));
  // }

PutUserDetails(id: number, dto: UsersDetailsDto) {
  const endpoint = this.BuildAddress(this.PutUserDetailsEnd, id);
  return this.Patch(endpoint, dto);
}

  // PutUserDetails(id: number, dto: UsersDetailsDto) {
  //   const apiKey = this.GetApiKey();
  //   let addHeaders = new HttpHeaders();
  //   addHeaders = addHeaders.append('Authorization', apiKey);

  //   const endpoint = this.BuildAddress(this.PutUserDetailsEnd, id);
  //   return this.client.patch(endpoint, dto, {observe: 'response', headers: addHeaders})
  //   .pipe(map(result => {
  //     if (result.ok) {
  //       return true;
  //     } else { return false; }
  //   }));
  // }


  GetManyUsers(ids: Array<number>): Observable<Array<UserDto>> {
    const endpoint = this.BuildAddress(this.GetManyUsersEnd);
    return this.Post<Array<UserDto>>(endpoint, ids);
  }

  // GetManyUsers(ids: Array<number>) {
  //   const apiKey = this.GetApiKey();
  //   const addHeaders = new HttpHeaders().set('Authorization', apiKey)

  //   const endpoint = this.BuildAddress(this.GetManyUsersEnd);
  //   return this.client.post<Array<UserDto>>(endpoint, ids, {headers: addHeaders}).pipe(map(result => {
  //     return result;
  //   }));
  // }

  GetUsersAvatar(ids: Array<number>): Observable<Array<UserAvatarDto>> {
    const endpoint = this.BuildAddress(this.GetUsersAvatars);
    return this.Post<Array<UserAvatarDto>>(endpoint, ids);
  }

  // GetUsersAvatar(ids: Array<number>): Observable<Array<UserAvatarDto>> {
  //   const apiKey = this.GetApiKey();
  //   const addHeaders = new HttpHeaders().set('Authorization', apiKey);
  //   const endpoint = this.BuildAddress(this.GetUsersAvatars);
  //   return this.client.post<Array<UserAvatarDto>>(endpoint, ids, {headers: addHeaders}).pipe(map(result => {
  //     return result;
  //   }));
  // }

  SetAvatar(dto: UserAvatarDto) {
    const endpoint = this.BuildAddress(this.PutAvatarBase64, dto.userId);
    return this.Set(endpoint, dto);
  }

  // SetAvatar(dto: UserAvatarDto) {
  //   const apiKey = this.GetApiKey();
  //   const addHeaders = new HttpHeaders().set('Authorization', apiKey);
  //   const endpoint = this.BuildAddress(this.PutAvatarBase64, dto.userId);
  //   return this.client.put(endpoint, dto, {headers: addHeaders}).pipe(map(result => {
  //     return result;
  //   }));
  //  }
}
