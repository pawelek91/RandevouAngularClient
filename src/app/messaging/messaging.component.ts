import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagesService } from '../services/message/Messages.service';
import { LastMessageDto, MessageDto } from '../services/message/MessageDto';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from '../services/users/UserDto';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit, OnDestroy {

  lastMessages: Array<LastMessageDto>;
  newMessageContent: string;

  displayMessageForm: boolean;
  speakerDto?: UserDto;
  conversation: Array<MessageDto>;
  displayShort: boolean;
  displayShortUserId: number;

  getConversationInterval: any;
  getLastMessagesInterval: any;

  constructor(private route: ActivatedRoute, private router: Router,
              private messagesService: MessagesService, private usersService: UsersService) {
    this.lastMessages = new Array<LastMessageDto>();
    this.conversation = new Array<MessageDto>();
   }

  ngOnInit() {
    this.getLastMessages();
    this.getLastMessagesInterval = setInterval( () => {
      this.getLastMessages();
    }, 10000);

    const identity = this.route.snapshot.paramMap.get('id');

    if (identity === null || identity === undefined || identity.length < 1) {
      this.displayMessageForm = false;
    } else {
      this.displayMessageForm = true;
      this.usersService.GetUserBasic(identity).subscribe(result => {
      this.speakerDto = result;

      this.getConversationMessagess(result.id);
      this.getConversationInterval = setInterval( () => {
        this.getConversationMessagess(result.id);
      }, 3000);
      });
    }
  }

  getConversationMessagess(id: number){
    this.messagesService.GetConversation(id).subscribe(messages => {
      this.conversation = messages;

    });
  }

  ngOnDestroy() {
    if (this.getConversationInterval) {
      clearInterval(this.getConversationInterval);
      clearInterval(this.getLastMessagesInterval);
    }
  }

  getLastMessages() {
    this.messagesService.GetLastConversations().subscribe(result => {
      this.lastMessages = result;
    }, error => {

    });
  }

  sendMessage() {
    if (this.speakerDto === null || this.speakerDto === undefined || this.speakerDto.id < 1) {
      return;
    }
    this.messagesService.SendMessage(this.speakerDto.id, this.newMessageContent).subscribe(result => {
      this.newMessageContent = '';
    }, error => {

    });
   }

   goToConversation(userId: number) {
    this.router.navigate(['/messages/' + userId]);
   }

   gotoProfile(userId: number) {
    this.router.navigate(['/user/' + userId]);
   }

   displayUser(id: number) {
    this.displayShort = true;
    this.displayShortUserId = id;
  }

}
