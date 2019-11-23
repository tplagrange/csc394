import { Component } from '@angular/core';
import { AuthenticationService } from '../_services';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  messages: any[];
  subscription: Subscription;
  intervalId: number;

  constructor(private auth: AuthenticationService) {
    this.messages = new Array();
  }

    ngOnInit() {
      this.messages.push({
          text: "Please select a project",
          date: new Date(),
          user: {
              name: "System"
          }
      })

      this.intervalId = setInterval(() => {this.loadMessages();}, 5000);

    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }

  loadMessages() {
      if (!localStorage.getItem('project')) {
          return
      } else {
          this.auth.getMessages(localStorage.getItem('project')).subscribe(messages => {
              this.messages = messages;
          });
      }
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
    this.auth.patchMessages(localStorage.getItem('project'), event).subscribe(res => {

    }, (err) => {
        console.error(err);
    });
  }
}
