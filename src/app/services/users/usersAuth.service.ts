import { Injectable } from '@angular/core';
import { ApiQueryService } from '../external/api-query.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserCreateDto } from './UserDto';
import { AuthenticationQueryService } from '../external/authentication-query.service';
import { RegisterDto, ApiAuthDto } from '../external/ApiAuthDto';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { QueryResult } from 'src/app/common/QueryResult';

@Injectable({
  providedIn: 'root'
})
export class UsersAuthService {

  postUserEndpoint: '/api/Users';

  constructor(private client: HttpClient, private authService: AuthenticationQueryService) {
    this.postUserEndpoint  = '/api/Users';
   }

   CreateUser(dto: UserCreateDto) {
    const queryResult = new QueryResult();

    const endpoint = ApiQueryService.ApiEndpoint + this.postUserEndpoint;
    dto.userDto.birthDate = new Date(dto.birthDate.year, dto.birthDate.month - 1, dto.birthDate.day).toJSON();
    const password = dto.password;

    return this.client.post(endpoint, dto.userDto)
    .pipe(map(result => {
      if (typeof(result) !== 'number') {
        queryResult.isSuccess = false;
        return queryResult;
      }
      queryResult.isSuccess = true;

      const resultId = result as number;
      this.CreateUserLogin(resultId, dto.password, queryResult);

      return queryResult;
    }));
   }

   CreateUserLogin(result: number, password: string, queryResult: QueryResult) {
    const registerDto: RegisterDto = {Password: password, UserId: result};
    this.authService.RegisterUser(registerDto).subscribe(subs => {
      if (subs !== true) {
        queryResult.isSuccess = false;
        queryResult.message = 'Nie udało się utworzyć loginu';
      }
    });
   }

   LoginUser(userName: string, password: string) {
     const dto: ApiAuthDto = {UserName: userName, Password: password};
     return this.authService.LoginUser(dto).pipe(map(result => {
      const queryResult = new QueryResult();

      if (result.length > 0) {
        queryResult.isSuccess = true;
        this.GetIdentity(result).subscribe(resultId => {
          const userIdentity = resultId;
          localStorage.setItem('RANDEVOU_APIKEY', result);
          localStorage.setItem('RANDEVOU_IDENTITY', userIdentity.toString());
        });
      } else {
        queryResult.isSuccess = false;
        queryResult.message = 'Nie udało się zalogować';
      }
      return queryResult;
     }));
  }

  LogoutUser() {
    ApiQueryService.ClearLoginInfos();
  }

  GetIdentity(apiKey: string) {

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', apiKey);
    this.CreateAuth(apiKey, headers);

    return this.authService.GetIdentity(apiKey, headers).pipe(map(result => {
      return result;
    }));
  }

  CreateAuth(apiKey: string, headers: HttpHeaders) {
    headers = headers.append('Authorization', apiKey);
  }
}
