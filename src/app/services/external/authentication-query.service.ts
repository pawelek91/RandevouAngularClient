import { Injectable } from '@angular/core';
import { RegisterDto, ApiAuthDto } from './ApiAuthDto';
import { ApiQueryService } from './api-query.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationQueryService {

  loginEndpotint = '/api/Login/Login';
  registerEndpoint = '/api/login/Register';
  identityEndpoint = '/api/login/Identity';

  constructor(private client: HttpClient) { }

  RegisterUser(dto: RegisterDto): Observable<boolean> {
    let isSuccess = false;
    const endpoint = ApiQueryService.ApiEndpoint + this.registerEndpoint;
    return this.client.post(endpoint, dto, {observe: 'response'})
    .pipe(map(response => {
      isSuccess = response.status === 200;
      return isSuccess;
    }));
  }

  LoginUser(dto: ApiAuthDto): Observable<string> {
    const endpoint = ApiQueryService.ApiEndpoint + this.loginEndpotint;
    return this.client.post<string>(endpoint, dto, {responseType: 'text' as 'json'}).pipe(map((result => {
      return result;
      }
      )));
  }

  GetIdentity(apiKey: string, addHeaders: HttpHeaders): Observable<number> {
    const endpoint = ApiQueryService.ApiEndpoint + this.identityEndpoint;
    return this.client.get<number>(endpoint, {headers: addHeaders});
  }


}
