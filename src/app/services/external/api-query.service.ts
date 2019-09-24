import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiQueryService {

  constructor(private client: HttpClient) { }

  static ApiEndpoint  = 'http://localhost:7777';

  static GetIdentity(): string {
    let identity = localStorage.getItem('RANDEVOU_IDENTITY');
    if(identity === null || typeof(identity) === undefined) {
      identity = '';
     }
    return identity;
  }

  static ClearLoginInfos() {
    localStorage.removeItem('RANDEVOU_IDENTITY');
    localStorage.removeItem('RANDEVOU_APIKEY');
  }

  BuildAddress(address: string, id?: number): string {
    if (id == null && id === undefined) {
      return address;
    }

    address = address.replace('{id}', id.toString());
    return address;
  }

  GetApiKey(): string {
    const apiKey = localStorage.getItem('RANDEVOU_APIKEY');
    return apiKey;
  }

  Post<T>(endpoint: string, dto: any, authorization: boolean = true, responseTypeText = false): Observable<T> {
    const opts = this.GenerateHttpOptions(authorization, responseTypeText);
    return this.client.post(endpoint, dto, opts).pipe(map(result => {
      return result as T;
    }));

    // const apiKey = this.GetApiKey();

    // if (authorization) {
    //   const addHeaders = new HttpHeaders().set('Authorization', apiKey);
    //   return this.client.post(endpoint, dto, {headers: addHeaders}).pipe(map(result => {
    //     return result as T;
    //   }));
    // } else {
    //   return this.client.post(endpoint, dto).pipe(map(result => {
    //     return result as T;
    //   }));
    // }
  }

  Get<T>(endpoint: string, authorization = true, responseTypeText = false): Observable<T> {
    const opts = this.GenerateHttpOptions(authorization, responseTypeText);
    return this.client.get<T>(endpoint, opts ).pipe(map(result => {
        return result;
      }));
  }


  Patch<T>(endpoint: string, dto: any,  authorization= true, responseTypeText = false): Observable<T> {
    const opts = this.GenerateHttpOptions(authorization, responseTypeText);
    return this.client.post(endpoint, dto, opts).pipe(map(result => {
      return result as T;
    }));

    // const apiKey = this.GetApiKey();

    // if (authorization) {
    //   const addHeaders = new HttpHeaders().set('Authorization', apiKey);
    //   return this.client.post(endpoint, dto, {headers: addHeaders}).pipe(map(result => {
    //     return result as T;
    //   }));
    // } else {
    //   return this.client.post(endpoint, dto).pipe(map(result => {
    //     return result as T;
    //   }));
    // }
  }

  Set<T>(endpoint: string, dto: any, authorization = true, responseTypeText = false): Observable<T> {
    const opts = this.GenerateHttpOptions(authorization, responseTypeText);
    return this.client.put(endpoint, dto, opts).pipe(map(result => {
      return result as T;
    }));

    // const apiKey = this.GetApiKey();

    // if (authorization) {
    //   const addHeaders = new HttpHeaders().set('Authorization', apiKey);
    //   return this.client.put(endpoint, dto, {headers: addHeaders}).pipe(map(result => {
    //     return result as T;
    //   }));
    // } else {
    //   return this.client.put(endpoint, dto).pipe(map(result => {
    //     return result as T;
    //   }));
    // }
  }

  GenerateHttpOptions(authorization: boolean, responseTypeText: boolean) {
    let addHeaders: HttpHeaders = new HttpHeaders();
    if (authorization) {
      const apiKey = this.GetApiKey();
      addHeaders = addHeaders.append('Authorization', apiKey);
    }

    const httpOptions = {
      headers: addHeaders,
      responseType:  'json' as 'json',
    };

    if (responseTypeText) {
      httpOptions.responseType = 'text' as 'json';
    }
    return httpOptions;
  }


}
