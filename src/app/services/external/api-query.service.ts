import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiQueryService {

  constructor() { }

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


}
