import { Injectable } from '@angular/core';
import { MessageDto, RequestMessagesDto, LastMessageDto } from './MessageDto';
import { ApiQueryService } from '../external/api-query.service';
import { MessageExtService } from '../external/MessagesExt.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  constructor(private extService: MessageExtService) {

  }

 SendMessage(userId: number, message: string) {
  const loggedUserId = ApiQueryService.GetIdentity();
  const dto: MessageDto = {content: message, receiverId: userId, senderId: +loggedUserId};
  return this.extService.SendMessage(dto);
 }

 GetConversation(userId: number): Observable<Array<MessageDto>> {
  const loggedUserId = ApiQueryService.GetIdentity();
  const dto: RequestMessagesDto = { firstUserId: +loggedUserId, secondUserId: userId};
  return this.extService.GetConversation(dto);
 }

 GetLastConversations(): Observable<Array<LastMessageDto>> {
  const loggedUserId = ApiQueryService.GetIdentity();
  return this.extService.GetLastMessages(+loggedUserId);
 }

}
