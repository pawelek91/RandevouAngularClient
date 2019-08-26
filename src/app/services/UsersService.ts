import { ApiQueryService } from './external/api-query.service';
import { UsersQueryExternalService } from './external/UsersQueryExt.service';
import { UserDto, UserFullDto } from './users/UserDto';
import { Injectable } from '@angular/core';
import { DictionaryItemsService } from './external/DictionaryItems.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

constructor(private usersQuery: UsersQueryExternalService, private dictionaryQuery: DictionaryItemsService) {

}
GetUserBasic(identity: string) {
  return this.usersQuery.GetUser(+identity);
}

GetUserWithDetails(identity: string) {
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

PatchUserData(dto: UserFullDto) {
  this.usersQuery.PatchUserBasicData(dto.basic.id, dto.basic).subscribe(result => {
    if (result) {
      this.usersQuery.PutUserDetails(dto.basic.id, dto.details).subscribe(secondResult => {

      });
    }
  });
}


}
