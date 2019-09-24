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

  Post<T>(endpoint: string, dto: any, authorization: boolean = true): Observable<T> {
    const apiKey = this.GetApiKey();

    if (authorization) {
      const addHeaders = new HttpHeaders().set('Authorization', apiKey);
      return this.client.post(endpoint, dto, {headers: addHeaders}).pipe(map(result => {
        return result as T;
      }));
    } else {
      return this.client.post(endpoint, dto).pipe(map(result => {
        return result as T;
      }));
    }
  }

  Get<T>(endpoint: string, authorization: boolean = true): Observable<T> {
    const apiKey = this.GetApiKey();

    if (authorization) {
      const addHeaders = new HttpHeaders().set('Authorization', apiKey);
      return this.client.get<T>(endpoint, {headers: addHeaders}).pipe(map(result => {
        return result;
      }));
    } else {
      return this.client.get<T>(endpoint).pipe(map(result => {
        return result;
      }));
    }
  }

  Patch<T>(endpoint: string, dto: any,  authorization: boolean = true): Observable<T> {
    const apiKey = this.GetApiKey();

    if (authorization) {
      const addHeaders = new HttpHeaders().set('Authorization', apiKey);
      return this.client.post(endpoint, dto, {headers: addHeaders}).pipe(map(result => {
        return result as T;
      }));
    } else {
      return this.client.post(endpoint, dto).pipe(map(result => {
        return result as T;
      }));
    }
  }

  Set<T>(endpoint: string, dto: any, authorization: boolean = true): Observable<T> {
    const apiKey = this.GetApiKey();

    if (authorization) {
      const addHeaders = new HttpHeaders().set('Authorization', apiKey);
      return this.client.put(endpoint, dto, {headers: addHeaders}).pipe(map(result => {
        return result as T;
      }));
    } else {
      return this.client.put(endpoint, dto).pipe(map(result => {
        return result as T;
      }));
    }
  }


}
