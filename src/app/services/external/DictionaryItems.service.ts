import { Injectable } from '@angular/core';
import { ApiQueryService } from './api-query.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DictionaryItemDto } from 'src/app/common/DictionaryItemDto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
 })
export class DictionaryItemsService extends ApiQueryService {


  InterestsEnd = ApiQueryService.ApiEndpoint + '/api/UserDictItems/Interest';
  HairColorsEnd = ApiQueryService.ApiEndpoint + '/api/UserDictItems/HairColors';
  EyesColorsEnd = ApiQueryService.ApiEndpoint + '/api/UserDictItems/EyesColors';

constructor(private httpClient: HttpClient ) {
  super();
}

GetAllInterests(): Observable<DictionaryItemDto[]> {
  const apiKey = this.GetApiKey();
  let addHeaders = new HttpHeaders();
  addHeaders = addHeaders.append('Authorization', apiKey);

  return this.httpClient.get<DictionaryItemDto[]>(this.InterestsEnd, {headers: addHeaders}).pipe(map(result => {
    return result;
  }));
}

GetAllHairColors(): Observable<DictionaryItemDto[]> {
  const apiKey = this.GetApiKey();
  let addHeaders = new HttpHeaders();
  addHeaders = addHeaders.append('Authorization', apiKey);
  return this.httpClient.get<DictionaryItemDto[]>(this.HairColorsEnd, {headers: addHeaders}).pipe(map(result => {
    return result;
  }));
}

GetAllEyesColor(): Observable<DictionaryItemDto[]> {
  const apiKey = this.GetApiKey();
  let addHeaders = new HttpHeaders();
  addHeaders = addHeaders.append('Authorization', apiKey);
  return this.httpClient.get<DictionaryItemDto[]>(this.EyesColorsEnd, {headers: addHeaders}).pipe(map(result => {
    return result;
  }));
}







}
