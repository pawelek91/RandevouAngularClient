import { SearchUsersExternalService } from '../external/SearchUsers.service';
import { UsersService } from './users.service';
import { findStaticQueryIds } from '@angular/compiler';
import { SearchQueryDto } from '../external/SearchQueryDto';
import { map } from 'rxjs/operators';

export class SearchUsersService {
  constructor(private searchService: SearchUsersExternalService, private usersService: UsersService) {
    }

    findStaticQueryIds(dto: SearchQueryDto) {
      return this.searchService.SearchUsers(dto).pipe(map((result: number[]) => {
        return result;
      }));
    }

    GetUsers(ids: Array<number>) {
      return this.usersService.GetManyUsers(ids).pipe(map(r => {
        return r;
      }));
    }

}
