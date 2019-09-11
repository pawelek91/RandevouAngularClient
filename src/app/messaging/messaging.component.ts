import { Component, OnInit } from '@angular/core';
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
export class MessagingComponent implements OnInit {

  lastMessages: Array<LastMessageDto>;
  newMessageContent: string;

  displayMessageForm: boolean;
  speakerDto?: UserDto;
  conversation: Array<MessageDto>;

  constructor(private route: ActivatedRoute, private router: Router,
              private messagesService: MessagesService, private usersService: UsersService) {
    this.lastMessages = new Array<LastMessageDto>();
    this.conversation = new Array<MessageDto>();
   }

  ngOnInit() {
    this.getLastMessages();
    const identity = this.route.snapshot.paramMap.get('id');

    if (identity === null || identity === undefined || identity.length < 1) {
      this.displayMessageForm = false;
    } else {
      this.displayMessageForm = true;
      this.usersService.GetUserBasic(identity).subscribe(result => {
      this.speakerDto = result;
      this.messagesService.GetConversation(result.id).subscribe(messages => {
        this.conversation = messages;
      });
      });
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

}
