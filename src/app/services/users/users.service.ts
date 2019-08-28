import { ApiQueryService } from '../external/api-query.service';
import { UsersQueryExternalService } from '../external/UsersQueryExt.service';
import { UserDto, UserFullDto } from './UserDto';
import { Injectable } from '@angular/core';
import { DictionaryItemsService } from '../external/DictionaryItems.service';
import { map } from 'rxjs/operators';
import { QueryResult } from '../../common/QueryResult';

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
  const queryResult = new QueryResult();
  return this.usersQuery.PatchUserBasicData(dto.basic.id, dto.basic).pipe(map(result => {
    if (result) {
      this.usersQuery.PutUserDetails(dto.basic.id, dto.details).subscribe(secondResult => {
        if (secondResult) {
          queryResult.isSuccess = true;
          return queryResult;
        } else {
          queryResult.isSuccess = false;
          queryResult.message = 'Nie udało się zaktualizować szczegółowych danych użytkownika';
        }
        return queryResult;
      });
    } else {
      queryResult.isSuccess = false;
      queryResult.message = 'Nie udało się zaktualizować danych użytkownika';
      return queryResult;
    }
  }));
}

GetManyUsers(ids: Array<number>){
  return this.usersQuery.GetManyUsers(ids);
}


}
