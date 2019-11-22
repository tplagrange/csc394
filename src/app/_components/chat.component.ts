import { Component } from '@angular/core';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messages: any[];

  constructor(private auth: AuthenticationService) {
    this.messages = new Array();
    // this.messages = this.auth.loadMessages();
  }

  sendMessage(event: any) {

    this.messages.push({
      text: event.message,
      date: new Date(),
      user: {
        name: 'Thomas',
      },
    });
    // const botReply = this.chatShowcaseService.reply(event.message);
    const botReply = false
    if (botReply) {
      setTimeout(() => { this.messages.push(botReply) }, 500);
    }
  }
}
