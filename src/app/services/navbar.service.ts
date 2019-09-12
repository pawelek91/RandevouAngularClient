import { Injectable } from '@angular/core';
import { ApiQueryService } from './external/api-query.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible: boolean;
  logged: boolean;

  constructor() { this.visible = false; }

  hide() { this.visible = false; }

  show() {
    const identity = ApiQueryService.GetIdentity();
    if (identity === null || identity === undefined || identity.length < 1) {
      this.logged = false;
    } else {
      this.logged = true;
    }
  }
}
