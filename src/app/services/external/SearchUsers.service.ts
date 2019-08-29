import { ApiQueryService } from './api-query.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchQueryDto } from './SearchQueryDto';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class SearchUsersExternalService extends ApiQueryService {
  constructor(private client: HttpClient) {
    super();
  }
   postUserFindEnd  = ApiQueryService.ApiEndpoint + '/api/UserFinder';


   SearchUsers(dto: SearchQueryDto): Observable<Array<number>> {
    const apiKey = this.GetApiKey();
    let addHeaders = new HttpHeaders();
    addHeaders = addHeaders.append('Authorization', apiKey);

    return this.client.post<Array<number>>(this.postUserFindEnd, dto, {headers: addHeaders, observe: 'response'} ).pipe(map(result => {
        if (result.ok) {
          return result.body;
        }
      }));
   }

}
