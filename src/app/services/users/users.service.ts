import { Injectable } from '@angular/core';
import { ApiQueryService } from '../external/api-query-serive.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserCreateDto } from './UserDto';
import { AuthenticationQueryService } from '../external/authentication-query-service.service';
import { RegisterDto } from '../external/ApiAuthDto';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { QueryResult } from 'src/app/common/QueryResult';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

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


  CreateUser2(dto: UserCreateDto) {
    const endpoint = ApiQueryService.ApiEndpoint + this.postUserEndpoint;
    let result: any;

    let d = new Date(dto.birthDate.year, dto.birthDate.month - 1, dto.birthDate.day);
    dto.userDto.birthDate = d.toJSON();
    const password = dto.password;
    return this.client.post(endpoint, dto.userDto).pipe(map(x =>
    {
      result = x;
      const registerDto: RegisterDto = {Password: password, UserId: result};
      const registerResult = this.authService.RegisterUser(registerDto).pipe(map(
      (res => {
          return res;
         }
      )));
      return registerResult;
    }),
    );
  }
}
