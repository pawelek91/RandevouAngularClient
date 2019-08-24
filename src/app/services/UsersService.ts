import { ApiQueryService } from './external/api-query.service';
import { UsersQueryExternalService } from './external/UsersQueryExt.service';
import { UserDto } from './users/UserDto';
import { Injectable } from '@angular/core';
import { DictionaryItemsService } from './external/DictionaryItems.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

constructor(private usersQuery: UsersQueryExternalService, private dictionaryQuery: DictionaryItemsService) {

}
GetUserBasic() {
  const identity = ApiQueryService.GetIdentity();
  return this.usersQuery.GetUser(+identity);
}

GetUserWithDetails() {
  const identity = ApiQueryService.GetIdentity();
  return this.usersQuery.GetUserDetails(+identity);
}

GetHairColorsDictionary() {
  return this.dictionaryQuery.GetAllHairColors();
}

GetEyesColorsDictionary() {
  return this.dictionaryQuery.GetAllEyesColor();
}

GetInterestsDictionary() {
  return this.dictionaryQuery.GetAllInterests();
}


}
