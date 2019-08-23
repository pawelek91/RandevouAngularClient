import { ApiQueryService } from './external/api-query.service';
import { UsersQueryExternalService } from './external/UsersQueryExtService';
import { UserDto } from './users/UserDto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

constructor(private usersQuery: UsersQueryExternalService) {

}
GetUserBasic() {
  const identity = ApiQueryService.GetIdentity();
  return this.usersQuery.GetUser(+identity);
}

GetUserWithDetails(){
  const identity = ApiQueryService.GetIdentity();
  return this.usersQuery.GetUserDetails(+identity);
}

}
