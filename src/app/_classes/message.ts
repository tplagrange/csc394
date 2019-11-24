import { MessageDetails } from "../_services/"


export class Message {
    type: string;
    text: string;
    reply: string;
    user: {
        name: string;
        avatar: string;
    };
    date: string;
    quote: string;
    latitude: string;
    longitude: string;
    avatar: string;

  constructor(md:MessageDetails) {
      this.type = md.type;
      this.text = md.type;
      this.reply = md.type;
      this.user = md.user;
      this.date = md.date;
      this.quote = md.quote;
      this.latitude = md.latitude;
      this.longitude = md.longitude;
      this.avatar = md.avatar;
  }
}
