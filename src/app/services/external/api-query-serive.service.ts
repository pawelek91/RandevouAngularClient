import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiQueryService {

  constructor() { }

  static ApiEndpoint  = 'http://localhost:7777';
}
