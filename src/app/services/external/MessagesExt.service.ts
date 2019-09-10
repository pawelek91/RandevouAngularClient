import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiQueryService } from './api-query.service';
import { Observable } from 'rxjs';
import { LastMessageDto, RequestMessagesDto, MessageDto } from '../message/MessageDto';

@Injectable({
  providedIn: 'root'
})

export class MessageExtService extends ApiQueryService {

  MessagesEndp = ApiQueryService.ApiEndpoint + '/api/Messages';
  ConversationsEndp = this.MessagesEndp + '/Conversation/{id}';
  SpeakersEndp = this.MessagesEndp + '/{id}/Speakers';
  WholeConversationEndp = this.MessagesEndp + '/Conversation';
  MessageMarkReadEndp = this.MessagesEndp + '/MarkRead';
  MessageMarkUnreadEndp = this.MessagesEndp + '/MarkUnread';
  constructor(private httpClient: HttpClient) {
    super();
  }

  GetLastMessages(userId: number): Observable<Array<LastMessageDto>> {
    const apiKey = this.GetApiKey();
    let addHeaders = new HttpHeaders();
    addHeaders = addHeaders.append('Authorization', apiKey);
    const endpoint = this.BuildAddress(this.ConversationsEndp, userId);
    return this.httpClient.get<Array<LastMessageDto>>(endpoint, {headers: addHeaders});
  }

  GetConversation(dto: RequestMessagesDto): Observable<Array<MessageDto>> {
    const apiKey = this.GetApiKey();
    let addHeaders = new HttpHeaders();
    addHeaders = addHeaders.append('Authorization', apiKey);
    const endpoint = this.BuildAddress(this.WholeConversationEndp, dto.firstUserId);
    return this.httpClient.post<Array<MessageDto>>(endpoint, dto, {headers: addHeaders});
  }

  SendMessage(dto: MessageDto) {
    const apiKey = this.GetApiKey();
    let addHeaders = new HttpHeaders();
    addHeaders = addHeaders.append('Authorization', apiKey);
    const endpoint = this.BuildAddress(this.MessagesEndp);
    return this.httpClient.post<Array<MessageDto>>(endpoint, dto, {headers: addHeaders});
  }
}
