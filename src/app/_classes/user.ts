import { LightUser, UserDetails } from "../_services/"


export class User {
  _id: string;
  name: string;
  email: string;

  // constructor(ud:UserDetails) {
  //     this._id = ud._id;
  //     this.name = ud.name;
  //     this.email = ud.email;
  // }

  constructor(lu:LightUser) {
      this._id = lu.uid;
      this.name = lu.uname;
      this.email = lu.uemail;
  }
}
