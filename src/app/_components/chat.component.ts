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

      this.intervalId = setInterval(() => {this.loadMessages();}, 1000);

    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }

  loadMessages() {
      if (!localStorage.getItem('project')) {
          return
      } else {
          this.auth.getMessages(localStorage.getItem('project')).subscribe(messages => {
              console.log(messages);
              if (this.messages.length != messages.length || this.messages.length > 0 && this.messages[0].user.name == "System") {
                  this.messages = messages;
              }
          });
      }
  }

  sendMessage(event: any) {
    var nm = {
      text: event.message,
      date: new Date(),
      user: {
        name: localStorage.getItem('email'),
      },
    };

    this.messages.push(nm)

    this.auth.patchMessages(localStorage.getItem('project'), nm).subscribe(res => {

    }, (err) => {
        console.error(err);
    });
  }
}
