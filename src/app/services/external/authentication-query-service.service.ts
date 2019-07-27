import { Injectable } from '@angular/core';
import { RegisterDto, ApiAuthDto } from './ApiAuthDto';
import { ApiQueryService } from './api-query-serive.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationQueryService {

  loginEndpotint = '/api/Login/Login';
  registerEndpoint = '/api/login/Register';
  identityEndpoint = 'api/login/Identity';

  constructor(private client: HttpClient) { }

  RegisterUser(dto: RegisterDto) {
  const endpoint = ApiQueryService.ApiEndpoint + this.registerEndpoint;
  this.client.post(endpoint, dto).subscribe();
  }

  LoginUser(dto: ApiAuthDto): string {
    const endpoint = ApiQueryService.ApiEndpoint + this.loginEndpotint;
    let response: string;

    this.client.post<string>(endpoint, {body: dto}).subscribe (result =>
      response = result
      );
    return response;
  }

  // GetIdentity(apiKey: string): number{

  // }
}
