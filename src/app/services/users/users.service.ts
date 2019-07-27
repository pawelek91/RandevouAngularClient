import { Injectable } from '@angular/core';
import { ApiQueryService } from '../external/api-query-serive.service';
import { HttpClient } from '@angular/common/http';
import { UserCreateDto } from './UserDto';
import { AuthenticationQueryService } from '../external/authentication-query-service.service';
import { RegisterDto } from '../external/ApiAuthDto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  postUserEndpoint: '/api/Users';
  constructor(private client: HttpClient, private authService: AuthenticationQueryService) {
    this.postUserEndpoint  = '/api/Users';
   }

  CreateUser(dto: UserCreateDto): number {
    const endpoint = ApiQueryService.ApiEndpoint + this.postUserEndpoint;
    let result: any;

    let d = new Date(dto.birthDate.year, dto.birthDate.month - 1, dto.birthDate.day);
    dto.userDto.birthDate = d.toJSON();
    const password = dto.password;
    this.client.post(endpoint, dto.userDto).subscribe(x =>
    {
      result = x;
      const registerDto: RegisterDto = {Password: password, UserId: result};
      this.authService.RegisterUser(registerDto);
    });

    return result;
  }
}
