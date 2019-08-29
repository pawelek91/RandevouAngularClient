import { SearchUsersExternalService } from '../external/SearchUsers.service';
import { UsersService } from './users.service';
import { findStaticQueryIds } from '@angular/compiler';
import { SearchQueryDto } from '../external/SearchQueryDto';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SearchUsersService {
  constructor(private searchService: SearchUsersExternalService) {
    }

    FindUsers(dto: SearchQueryDto) {
      return this.searchService.SearchUsers(dto).pipe(map((result: number[]) => {
        return result;
      }));
    }
}
