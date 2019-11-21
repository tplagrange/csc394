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
    console.log(event)
    this.messages.push({
      text: event.message,
      date: new Date(),
      user: {
        name: localStorage.getItem('user'),
      },
    });
    this.auth.patchMessages(localStorage.getItem('project'), event.message).subscribe(res => {

    }, (err) => {
        console.error(err);
    });
  }
}
